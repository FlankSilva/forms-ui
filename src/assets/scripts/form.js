/**
 * Customizes the appearance of a select element based on its value.
 * If the select has no value (empty string), it applies the placeholder color.
 * Otherwise, it applies the specified text color.
 * @param {string} elementId - The ID of the select element.
 * @param {string} textColor - The color to apply to the text when a value is selected.
 * @param {string} placeholderColor - The color to apply when no value is selected (placeholder).
 */
const custonSelect = (elementId, textColor, placeholderColor) => {
  let selectElement = document.getElementById(elementId);
  let selectedValue = selectElement.value;
  if (selectedValue === '') {
    selectElement.style.color = placeholderColor;
  } else {
    selectElement.style.color = textColor;
  }
};

/**
 * Checks if a string contains any numbers.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string contains numbers, false otherwise.
 */
function hasNumbers(str) {
  return /\d/g.test(str);
}

/**
 * Sets the visibility of happy/sad face icons for a checkbox based on its checked state.
 * @param {string} checkboxId - The ID of the checkbox input.
 */
const setCarinhaCheck = (checkboxId) => {
  let checkboxElement = document.getElementById(checkboxId);
  let iconFeliz = document.getElementById(
    `icon-status-dynamic-checked-feliz-${checkboxId}`,
  );
  let iconTriste = document.getElementById(
    `icon-status-dynamic-checked-triste-${checkboxId}`,
  );

  if (checkboxElement.checked) {
    iconFeliz.classList.remove('invisible');
    iconTriste.classList.add('invisible');
  } else {
    iconFeliz.classList.add('invisible');
    iconTriste.classList.remove('invisible');
  }
};

/**
 * Handles the "Yes/No" button group interaction.
 * Sets the value of a hidden checkbox and styles the buttons accordingly.
 * @param {string} value - "SIM" or "NAO".
 * @param {string} baseId - The base ID for the component elements.
 * @param {string} hoverBgColor - Background color for the active button.
 * @param {string} hoverTextColor - Text color for the active button.
 * @param {string} defaultBgColor - Background color for the inactive button.
 * @param {string} defaultTextColor - Text color for the inactive button.
 */
const setValueYesNo = (
  value,
  baseId,
  hoverBgColor,
  hoverTextColor,
  defaultBgColor,
  defaultTextColor,
) => {
  let hiddenCheckbox = document.getElementById(`checked-${baseId}`); // Stores true (SIM) or false (NAO)
  let validationInput = document.getElementById(baseId); // This input seems to be used to trigger overall validation
  let yesButton = document.getElementById(
    `btn-label-yes-dynamic-button-${baseId}`,
  );
  let noButton = document.getElementById(
    `btn-label-no-dynamic-button-${baseId}`,
  );

  validationInput.checked = true; // Mark as interacted for validation purposes

  if (value === 'SIM') {
    hiddenCheckbox.checked = true;
    yesButton.style.backgroundColor = hoverBgColor;
    yesButton.style.color = hoverTextColor;
    yesButton.style.border = '0'; // Or use a class to remove border
    noButton.style.backgroundColor = defaultBgColor;
    noButton.style.color = defaultTextColor;
    noButton.style.border = '1px solid'; // Or use a class to add border
  } else {
    // NAO
    hiddenCheckbox.checked = false;
    noButton.style.backgroundColor = hoverBgColor;
    noButton.style.color = hoverTextColor;
    noButton.style.border = '0';
    yesButton.style.backgroundColor = defaultBgColor;
    yesButton.style.color = defaultTextColor;
    yesButton.style.border = '1px solid';
  }
};

/**
 * Toggles the status and icons for a checkbox-like component.
 * Note: The parameter `elementId` is declared but not used within the function.
 * The function relies on `statusSpanId`, `iconFelizId`, and `iconTristeId`.
 * @param {string} elementId - (Unused) The ID of the main element.
 * @param {string} statusSpanId - The ID of the span element holding the "true"/"false" status.
 * @param {string} iconFelizId - The ID of the happy face icon.
 * @param {string} iconTristeId - The ID of the sad face icon.
 */
const validateCheckbox = (
  elementId,
  statusSpanId,
  iconFelizId,
  iconTristeId,
) => {
  // document.getElementById(elementId); // This line does nothing as its result is not stored or used.
  let statusSpan = document.getElementById(statusSpanId);
  let iconFeliz = document.getElementById(iconFelizId);
  let iconTriste = document.getElementById(iconTristeId);

  if (statusSpan.innerHTML.trim() == 'true') {
    statusSpan.innerHTML = 'false';
    iconTriste.classList.remove('invisible');
    iconFeliz.classList.add('invisible');
  } else {
    statusSpan.innerHTML = 'true';
    iconTriste.classList.add('invisible');
    iconFeliz.classList.remove('invisible');
  }
};

// Global variables (presumably for select options or other shared data)
let dataOptions = {};
let itensOptionsToSelect = '';

const testeMinhaFuncao = () => {
  console.log('Testing...');
};

/**
 * Validates all dynamic input fields on the page.
 * Updates UI elements (error messages, icons, button states) based on validation results.
 * @param {string} [specificInputIdForCep] - Optional. If provided and the input type is 'cep',
 *                                           it triggers CEP validation for this specific ID.
 * @returns {object} An object containing:
 *                   - isValidate: boolean (true if all inputs are valid, false otherwise)
 *                   - data: object (a key-value map of input IDs and their values)
 */
const inputValidateValue = (specificInputIdForCep) => {
  let allInputs = document.querySelectorAll('.input-dynamic-input');
  let btnAvancar01 = document.getElementById('btn-avancar-01');
  let btnAvancar02 = document.getElementById('btn-avancar-02');
  let errorCount = 0;

  allInputs.forEach((inputElement) => {
    let textErrorElement = document.getElementById(
      `text-error-dynamic-input-${inputElement.id}`,
    );
    let containerCarInputs = document.getElementById(
      `container-card-dynamic-input-${inputElement.id}`,
    );
    let containerCarSelects = document.getElementById(
      `container-card-dynamic-select-${inputElement.id}`,
    );

    // if (containerCarInputs) {
    //   let computedStyle = window.getComputedStyle(containerCarInputs);
    // }

    let iconFeliz = document.getElementById(
      `icon-status-dynamic-input-feliz-${inputElement.id}`,
    );
    let iconTriste = document.getElementById(
      `icon-status-dynamic-input-triste-${inputElement.id}`,
    );
    let iconDefault = document.getElementById(
      `icon-status-dynamic-input-default-${inputElement.id}`,
    );
    let validationFunction = listTypes[inputElement.name]; // 'name' attribute holds the validation type

    if (inputElement.name !== 'cep') {
      // CEP has its own async validation logic
      let isValid = false;
      if (inputElement.type === 'checkbox') {
        isValid = inputElement.checked; // For checkboxes, validation is usually just if it's checked (if required)
        // Or if it's a specific type of checkbox that has a 'required' attribute.
        // The original code implies that for checkboxes, `inputElement.checked` is the validation.
        // For the custom radio/button group, the hidden input with name="required" is checked.
      } else if (validationFunction) {
        isValid = validationFunction(inputElement.value);
      } else {
        isValid = true; // If no validation function, assume valid or handle as error
      }

      if (!isValid) {
        errorCount += 1;
      }

      if (iconDefault) iconDefault.classList.add('invisible'); // Hide default icon once interacted

      if (isValid) {
        if (iconFeliz && iconTriste) {
          iconFeliz.classList.remove('invisible');
          iconTriste.classList.add('invisible');
        }
        if (containerCarInputs) {
          containerCarInputs.style.boxShadow = 'none';
        }
        if (containerCarSelects) {
          containerCarSelects.style.boxShadow = 'none';
        }
        if (textErrorElement) {
          textErrorElement.classList.add('noVisibled');
        }
      } else {
        if (iconFeliz && iconTriste) {
          iconFeliz.classList.add('invisible');
          iconTriste.classList.remove('invisible');
        }
        if (containerCarInputs) {
          containerCarInputs.style.boxShadow = '0 0 0 1px red';
        }
        if (containerCarSelects) {
          containerCarSelects.style.boxShadow = '0 0 0 1px red';
        }

        if (textErrorElement) textErrorElement.classList.remove('noVisibled');
      }
    }
  });

  // Handle CEP validation separately if a specificInputIdForCep is provided
  let inputArray = Array.from(allInputs);
  let cepInput = inputArray.find((input) => input.name === 'cep');

  if (cepInput && specificInputIdForCep === cepInput.id) {
    // Assuming 'strCep' was a placeholder for cepInput.id
    // The original code calls validateCep(cepInput, errorCount)
    // but validateCep handles its own error display and doesn't directly return errorCount.
    // The `errorCount` modification inside `validateCep` in the original code is problematic as it's pass-by-value for numbers.
    // For now, we'll call it, but the errorCount logic for CEP needs careful review.
    validateCep(cepInput, errorCount); // This might not update errorCount correctly.
    // It's better if validateCep returns a boolean or promise.
  }

  let isFormValid = errorCount === 0;

  if (btnAvancar01) {
    if (isFormValid) {
      btnAvancar01.classList.remove('disabled');
    } else {
      btnAvancar01.classList.add('disabled');
    }
  }
  if (btnAvancar02) {
    if (isFormValid) {
      btnAvancar02.classList.remove('disabled');
    } else {
      btnAvancar02.classList.add('disabled');
    }
  }

  // Collect data from all inputs
  let inputDataArray = Array.from(allInputs).map((input) => ({
    id: input.id,
    value: input.type === 'checkbox' ? input.checked : input.value, // Store boolean for checkboxes
  }));

  let formDataObject = {};
  for (let item of inputDataArray) {
    formDataObject[item.id] = item.value;
  }
  // Also include values from hidden 'checked-ID' inputs for RadioRestriction
  document.querySelectorAll('input[id^="checked-"]').forEach((hiddenInput) => {
    formDataObject[hiddenInput.id] = hiddenInput.checked;
  });

  return {
    isValidate: isFormValid,
    data: formDataObject,
  };
};

const inputValidateUnitValue = (inputId) => {
  let errorCount = 0;
  const inputElement = document.getElementById(inputId);

  let textErrorElement = document.getElementById(
    `text-error-dynamic-input-${inputElement.id}`,
  );
  let containerCarInputs = document.getElementById(
    `container-card-dynamic-input-${inputElement.id}`,
  );
  let containerCarSelects = document.getElementById(
    `container-card-dynamic-select-${inputElement.id}`,
  );

  let iconFeliz = document.getElementById(
    `icon-status-dynamic-input-feliz-${inputElement.id}`,
  );
  let iconTriste = document.getElementById(
    `icon-status-dynamic-input-triste-${inputElement.id}`,
  );
  let iconDefault = document.getElementById(
    `icon-status-dynamic-input-default-${inputElement.id}`,
  );

  let validationFunction = listTypes[inputElement.name];

  if (inputElement.name !== 'cep') {
    // CEP has its own async validation logic
    let isValid = false;
    if (inputElement.type === 'checkbox') {
      isValid = inputElement.checked; // For checkboxes, validation is usually just if it's checked (if required)
    } else if (validationFunction) {
      isValid = validationFunction(inputElement.value);
    } else {
      isValid = true; // If no validation function, assume valid or handle as error
    }

    if (!isValid) {
      errorCount += 1;
    }

    if (iconDefault) iconDefault.classList.add('invisible'); // Hide default icon once interacted

    if (isValid) {
      if (iconFeliz && iconTriste) {
        iconFeliz.classList.remove('invisible');
        iconTriste.classList.add('invisible');
      }
      if (containerCarInputs) {
        containerCarInputs.style.boxShadow = 'none';
      }
      if (containerCarSelects) {
        containerCarSelects.style.boxShadow = 'none';
      }
      if (textErrorElement) {
        textErrorElement.classList.add('noVisibled');
      }
    } else {
      if (iconFeliz && iconTriste) {
        iconFeliz.classList.add('invisible');
        iconTriste.classList.remove('invisible');
      }
      if (containerCarInputs) {
        containerCarInputs.style.boxShadow = '0 0 0 1px red';
      }
      if (containerCarSelects) {
        containerCarSelects.style.boxShadow = '0 0 0 1px red';
      }

      if (textErrorElement) textErrorElement.classList.remove('noVisibled');
    }
  }
};

/**
 * Applies a mask to an input field based on the specified mask type.
 * @param {string} inputId - The ID of the input element.
 * @param {string} maskType - The type of mask to apply (e.g., 'cpf', 'cel').
 */
const maskInput = (inputId, maskType) => {
  let inputElement = document.getElementById(inputId);
  let maskFunction = listTypesMask[maskType];
  if (maskFunction && inputElement) {
    inputElement.value = maskFunction(inputElement.value);
  }
};

/**
 * Sets the maxLength attribute for an input field based on its type.
 * @param {string} inputId - The ID of the input element.
 * @param {string} type - The type of input, used to look up the maxLength.
 */
const maxLengthInput = (inputId, type) => {
  let inputElement = document.getElementById(inputId);
  let maxLengthValue = listMaxLength[type];
  if (maxLengthValue && inputElement) {
    inputElement.maxLength = maxLengthValue;
  }
};

// --- MASKING FUNCTIONS ---
const setMaskPhone = (value = '') => {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // (XX) X...
  value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // XXXXX-XXXX or XXXX-XXXX
  return value;
};

const setMaskCPF = (value = '') => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const setMaskCNPJ = (value = '') => {
  value = value.replace(/[^\d]/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1/$2');
  value = value.replace(/(\d{4})(\d{1,2})/, '$1-$2');
  return value;
};

const setMaskCpfCNPJ = (value = '') => {
  value = value.replace(/[^\d]/g, '');
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (value.length === 14) {
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }
  return value;
};

const setMaskCEP = (value = '') => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1'); // Ensure only 3 digits after hyphen
};

const setMaskNumbers = (value = '') => {
  const nonNumericRegex = /[^0-9]/g;
  return value.replace(nonNumericRegex, '');
};

function maskCurrency(amount, locale = 'pt-BR', currencyCode = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

const setMaskCurrency = (event) => {
  // Assumes it's called from an event handler
  let rawValue = event.target.value;
  let digits = rawValue
    .split('')
    .filter((char) => /\d/.test(char))
    .join('')
    .padStart(3, '0');
  let numericValue = parseFloat(digits.slice(0, -2) + '.' + digits.slice(-2));
  return maskCurrency(numericValue); // This will return the formatted string, e.g., "R$ 123,45"
  // The input's value needs to be set to this return value.
  // Original: return maskCurrency(l) - where l was the numeric value
};

// --- VALIDATION FUNCTIONS ---
const validateName = (nameStr) => {
  // Must not contain numbers and should have at least two names (first and last)
  // Allows letters, accented characters, apostrophes, and spaces.
  if (hasNumbers(nameStr)) return false;
  return /^[A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+[A-zÀ-ÿ']*$/g.test(
    nameStr.trim(),
  );
};

const validateCpf = (cpfStr = '') => {
  let cpf = cpfStr.replace(/\D/g, ''); // Remove non-digits
  if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let isValid = true;
  [9, 10].forEach((numDigits) => {
    let sum = 0;
    let remainder;
    cpf
      .split(/(?=)/)
      .splice(0, numDigits)
      .forEach((digit, index) => {
        sum += Number(digit) * (numDigits + 2 - (index + 1));
      });
    remainder = sum % 11;
    remainder = remainder < 2 ? 0 : 11 - remainder;
    if (remainder !== parseInt(cpf.substring(numDigits, numDigits + 1))) {
      isValid = false;
    }
  });
  return isValid;
};

const validateCNPJ = (cnpjStr = '') => {
  let cnpj = cnpjStr.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let sum1 = 0;
  for (let i = 0; i < 12; i++) {
    sum1 += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 13 - i);
  }
  let digit1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11);

  let sum2 = 0;
  for (let i = 0; i < 13; i++) {
    sum2 += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 14 - i);
  }
  let digit2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11);

  return (
    digit1 === parseInt(cnpj.charAt(12)) && digit2 === parseInt(cnpj.charAt(13))
  );
};

const removeMask = (value) => value.replace(/[^a-zA-Z0-9]/g, '');

const validateCPFCNPJ = (value) => {
  let cleanedValue = removeMask(value);
  if (cleanedValue.length === 11) {
    return validateCpf(value);
  } else if (cleanedValue.length === 14) {
    return validateCNPJ(value);
  }
  return false;
};

const validateBirthDate = (dateStr) => {
  // Expects YYYY-MM-DD or a format Date can parse
  let dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return false; // Invalid date format

  let today = new Date();
  let minAgeDate = new Date(); // 18 years ago
  minAgeDate.setFullYear(today.getFullYear() - 18);

  let maxAgeDate = new Date(); // 120 years ago
  maxAgeDate.setFullYear(today.getFullYear() - 120);

  // Not in the future and not older than 120 years and at least 18 years old
  // The original logic was: !(t > l) && !(t < s) which means dateObj <= today && dateObj >= maxAgeDate
  // It didn't explicitly check for 18 years old, but the comment implied it.
  // Let's assume the PHP description for 'datanasc' is the source of truth for age limits.
  // If it's just a generic birth date, the 18-year check might be context-specific.
  // For now, sticking to "not in future" and "not too old".
  // If 18+ is required, it should be: dateObj <= minAgeDate && dateObj >= maxAgeDate
  return dateObj <= today && dateObj >= maxAgeDate;
};

const validateEmail = (emailStr) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailStr);
};

const validateCel = (celStr) => {
  let cleanedCel = celStr.replace(/[^\d]+/g, '').toString();
  // Brazilian cell phone format: (XX) 9XXXX-XXXX or (XX) 3XXX-XXXX (some fixed lines were ported)
  // Regex allows for 2-digit DDD, then 8 or 9 digits for the number.
  // (11-19, 21-29, ..., 91-99) (3XXXXXXXX or 9XXXXXXXX)
  return /^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$/.test(
    cleanedCel,
  );
};

const validateLandline = (telStr) => {
  let maskedTel = setMaskPhone(telStr); // Standardize format for regex
  // Regex for Brazilian landlines: (XX) [2-8]XXX-XXXX
  const landlineRegex =
    /^\(?([1-9]{2})\)?[-. ]?([2-8]{1})([0-9]{3,4})[-. ]?([0-9]{4})$/;
  // Regex to exclude numbers that look like cell phones (starting with 9 after DDD)
  const looksLikeCellphoneRegex =
    /^\(?([1-9]{2})\)?[-. ]?([9]{1})([0-9]{3,4})[-. ]?([0-9]{4})$/;
  return (
    landlineRegex.test(maskedTel) && !looksLikeCellphoneRegex.test(maskedTel)
  );
};

const validateAllPhones = (phoneStr) => {
  // General phone format: (XX) XXXX-XXXX or (XX) XXXXX-XXXX
  const generalPhoneRegex = /^(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})$/;
  return generalPhoneRegex.test(phoneStr);
};

const validateCep = (cepInputElement, initialErrorCount) => {
  // initialErrorCount is problematic here
  let inputId = cepInputElement.id;
  let textErrorElement = document.getElementById(
    `text-error-dynamic-input-${inputId}`,
  );
  let iconFeliz = document.getElementById(
    `icon-status-dynamic-input-feliz-${inputId}`,
  );
  let iconTriste = document.getElementById(
    `icon-status-dynamic-input-triste-${inputId}`,
  );
  let iconDefault = document.getElementById(
    `icon-status-dynamic-input-default-${inputId}`,
  );
  let spinnerElement = document.getElementById(
    `spiner-dynamic-input-${inputId}`,
  );
  let estadoIdInput = document.getElementById(`rIdEstados-${inputId}`);
  let cidadeIdInput = document.getElementById(`rIdCidades-${inputId}`);
  let dddCidadeInput = document.getElementById(`ddd-Cidades-${inputId}`);

  // Initial UI state for error
  textErrorElement.classList.remove('noVisibled');
  iconFeliz.classList.add('invisible');
  iconTriste.classList.remove('invisible');
  iconDefault.classList.add('invisible');

  if (!cepInputElement || !(cepInputElement.value.length >= 9)) {
    // CEP with mask is XXXXX-XXX (9 chars)
    return false; // Or handle errorCount update here if it were passed by reference
  }

  spinnerElement.classList.remove('invisible');
  iconDefault.classList.add('invisible');
  iconFeliz.classList.add('invisible');
  iconTriste.classList.add('invisible');
  cepInputElement.classList.add('disabled-input-dynamic-input');
  cepInputElement.disabled = true;

  fetch(
    `https://api.cep.cenarioconsulta.com.br/logradouro/${cepInputElement.value}`,
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((apiResponse) => {
      spinnerElement.classList.add('invisible');
      cepInputElement.classList.remove('disabled-input-dynamic-input');
      cepInputElement.disabled = false;

      if (apiResponse.code != 200) {
        // initialErrorCount += 1; // This won't affect the caller's errorCount
        iconTriste.classList.remove('invisible');
        iconDefault.classList.add('invisible'); // Default should remain hidden
        textErrorElement.classList.remove('noVisibled'); // Ensure error text is visible
      } else {
        textErrorElement.classList.add('noVisibled');
        iconTriste.classList.add('invisible');
        iconFeliz.classList.remove('invisible');
        cidadeIdInput.value = apiResponse.body.cidade.rIdCidadesLeads;
        estadoIdInput.value = apiResponse.body.estado.rIdEstadoLeads;

        // Nested fetch for DDD - consider if this needs its own error handling/spinner
        setTimeout(() => {
          // Why the timeout?
          fetch('https://api.cenarioleads.net.br/api/ddd', {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3YmQwOThhYzAwYzZmZTZhYjFiZWRlNDFkNWM0ZWFiYzQ0NGU2YzU0NWVhOWNhY2RhZWIyOTlhMDA1NmY3YTM0NWRhMjljOWUyNTMzODE5In0.eyJhdWQiOiIxIiwianRpIjoiZTdiZDA5OGFjMDBjNmZlNmFiMWJlZGU0MWQ1YzRlYWJjNDQ0ZTZjNTQ1ZWE5Y2FjZGFlYjI5OWEwMDU2ZjdhMzQ1ZGEyOWM5ZTI1MzM4MTkiLCJpYXQiOjE1NjY4MjU5OTksIm5iZiI6MTU2NjgyNTk5OSwiZXhwIjoxNjE4NjY1OTk5LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.A2-x_S_TSuFjigSpD8_kdFzlfClyTFSh8XxQ_ZNtZYhOgzo6hIPiJZAOcVaoomJ53cryPlZi5FWrqfArPC-3U6YW4MTvDrNbdZUlQltH9ejMzhWDz-lBW87xQShUY-JgrDrPiA2NI-LAgIydSQwaUXE2mLPrIYfmIX5QDCd2--PWJ_vkfto3AHg8xH7nzy8AEfR4ucjNPaAGZKcOkvXHK7wtTcc9r3dBahTc4NDgQ13xGSkqk8e191r-zU63kQXBGH1nhlH6rbb79lA4_jaZV-cRfwht6nmdbxxQPi7tVbT0tqWELf7HgFu6UqA3wxNL13sXhcNsu4K7Tvix60oWELQbZ1-jsPBQKDHqZDgs9L2mh_HboCAOokfjbCNTrTnNnefotcUVHdBjLGKBAKk0BFEkIWy0O2HtihZ_AufsXk24dPOMBuWrEUJ-NHvEz9qDnOlG3VJ68JoXUUPd_L04qaNd2cuC2b_T5eZJvoHD2OYxjF2MYuVkyITiTv9C8ttsQz7v2Ynhwhpg-whE-qTfWnkOPIAGDFWDhmNXR_CNVqYvuu4kmArTm2YskmlI93G6MoTkt1DJM1dfZ8MiGR3Nk4dbvA4WgQe624Q3TJlqPKA7yB57IAlmcs6ADel3wObfmHEFtzOZKos6E1nwS3FSwBXzKqWd6KMX7QExMyAVHtM', // This token might be expired or sensitive
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rIdCidades: cidadeIdInput.value,
            }),
          })
            .then((response) => response.json())
            .then((dddResponse) => {
              dddCidadeInput.value = dddResponse; // Assuming dddResponse is the DDD value directly
            })
            .catch((error) => console.error('Error fetching DDD:', error));
        }, 2000);
      }
    })
    .catch((error) => {
      console.error('Error fetching CEP:', error);
      spinnerElement.classList.add('invisible');
      cepInputElement.classList.remove('disabled-input-dynamic-input');
      cepInputElement.disabled = false;
      // initialErrorCount += 1; // This won't affect the caller's errorCount
      iconTriste.classList.remove('invisible');
      iconDefault.classList.add('invisible');
      textErrorElement.classList.remove('noVisibled');
    });
  // This function should ideally return a promise that resolves to true/false
  // or updates a global error state in a more robust way.
};

const validateCityOfBirth = (cityStr) => {
  // Original logic: !(hasNumbers(a) || a.length <= 1)
  // Assuming 'a' was cityStr.
  return !hasNumbers(cityStr) && cityStr.trim().length > 1;
};

const validateDateExpedition = (dateStr) => {
  // Expects YYYY-MM-DD
  let dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return false; // Invalid date format
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Compare dates only
  dateObj.setHours(0, 0, 0, 0); // Compare dates only

  return dateObj > today; // Expedition date must be in the future
};

const validateIsNumber = (value) => /^\d+$/.test(value);

const validateRequired = (value) => {
  // Original: /[A-zÀ-ÿ!-_]/g.test(e)
  // This regex checks if there's *at least one* letter, accented char, !, -, or _.
  // A more common "required" check is simply that the trimmed value is not empty.
  // Let's assume the original intent was "not empty and contains some valid char".
  // If it's just "not empty", it would be: value.trim() !== ""
  return value.trim() !== ''; // A more standard "required" check
  // return /[A-zÀ-ÿ!-_]/g.test(value); // Sticking to original if specific chars are needed
};

const validateDateBirthLoan = (dateStr) => {
  // Expects DD/MM/YYYY
  var parts = dateStr.split('/');
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Original: !(1940 >= parseInt(t[2]) || parseInt(t[2]) > 2002)
  // This means year must be > 1940 AND year <= 2002.
  // So, 1941 to 2002 inclusive.
  if (year < 1941 || year > 2002) return false;

  // General date validation regex (DD/MM/YYYY)
  const dateRegex =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/;
  return dateRegex.test(dateStr);
};

const validateMonthlyIncome = (incomeStr) => {
  const incomeRegex = /^R\$\s((?:[1-9]\d{0,2}(?:\.\d{3})*|0)(?:,\d{1,2})?)$/;
  return incomeRegex.test(incomeStr.trim());
};

const validateInstallments = (installmentsValue) => {
  // Assuming installmentsValue is a number or can be parsed to one.
  // And it means the number of installments cannot be zero.
  return parseInt(installmentsValue, 10) !== 0;
};

const validatePassword = (passwordStr) => {
  // At least 8 chars, one uppercase, one lowercase, one digit, one special char ($*&@#)
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(
    passwordStr,
  );
};

const noValidation = (value) => true; // For fields that don't need validation

const validateConfirmPassword = (confirmPasswordStr) => {
  let passwordInput = document.getElementById('strPassword'); // Assumes the main password field has ID "strPassword"
  if (passwordInput) {
    return confirmPasswordStr === passwordInput.value;
  }
  return false; // Cannot confirm if main password field is not found
};

// Lookup object for validation functions based on input's 'name' attribute
const listTypes = {
  nome: validateName,
  cpf: validateCpf,
  cnpj: validateCNPJ,
  cpfcnpj: validateCPFCNPJ,
  datanasc: validateBirthDate,
  email: validateEmail,
  cel: validateCel,
  tel: validateLandline,
  celreq: validateCel, // Assuming 'celreq' is a required cell phone
  telreq: validateLandline, // Assuming 'telreq' is a required landline
  // 'telreq': "", // Duplicate key, assuming it was a typo for another type or same as above
  telcel: validateAllPhones,
  cep: validateCep, // Note: validateCep is async and has side effects, not a pure boolean returner for listTypes
  required: validateRequired,
  banks: noValidation, // Or a specific bank validation if needed
  'cidade-nascimento': validateCityOfBirth,
  numbers: validateIsNumber,
  datExpedicao: validateDateExpedition,
  datNascimentoEmprestimo: validateDateBirthLoan,
  'renda-mensal': validateMonthlyIncome,
  parcelas: validateInstallments,
  'confirma-senha': validateConfirmPassword,
  senha: validatePassword,
  null: noValidation,
};

const listTypesMask = {
  cpf: setMaskCPF,
  cnpj: setMaskCNPJ,
  cpfcnpj: setMaskCpfCNPJ,
  cel: setMaskPhone,
  tel: setMaskPhone,
  celreq: setMaskPhone,
  telreq: setMaskPhone,
  telcel: setMaskPhone,
  cep: setMaskCEP,
  numbers: setMaskNumbers,
  datNascimentoEmprestimo: null,
  'renda-mensal': setMaskCurrency,
};

const listMaxLength = {
  cpf: 14,
  cnpj: 18,
  cpfcnpj: 18,
  cel: 15,
  tel: 14,
  celreq: 15,
  telreq: 14,
  telcel: 15,
  cep: 9,
};
