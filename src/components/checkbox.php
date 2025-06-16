<?php

/**
 * Criar o componente de Checkbox.
 * Para pergar o valor selecionado no checkbox, utilize o getElementById pelo id ***"status-checked-dynamic-select-ID"***,
 * onde esse ***'ID'*** e o mesmo que foi passado como parametro.
 * 
 * @param label: A label deve ser passada como tag customizada em formato de string, seguindo o exemplo:.
 * <label class="" for="checkTermos">Lorem ipsun</label>.
 * @param functionGetStatusValues: Seta a função de validação pelo metodo onInput.
 * Deve ser declarado, quando há a necessidade de capturar o status de todos os campos de forma externa.
 * Exemplo: Habilitar um botão de "ENVIAR"
 * @param 

 */

function Checkbox(
  $props = array(
    'id' => '',
    'label' => '',
    'checked' => 'checked',
    'textError' => 'Campo ínvalido',
    'classTextError' => '',
    'iconLittleFace' => false
  )
) {
  $isCkecked = $props['checked'] == true ? 'true' : 'false';

  $isVisibledIconFeliz = $props['checked'] == true ? '' : 'invisible';
  $displayIconLittleFace = isset($props['iconLittleFace']) && empty($props['iconLittleFace']) ? 'none' : 'block';
?>

  <div class="container-dynamic-termos">
    <span id="status-checked-dynamic-select-<?php echo $props['id'] ?>" style="display: none;">
      <?php echo $isCkecked ?>
    </span>
    <div class="content-dynamic-termos">
      <input
        type="checkbox"
        id="<?php echo $props['id'] ?>"
        class="input-dynamic-input custon-input-checked"
        name="required"
        onclick="inputValidateUnitValue('<?php echo $props['id'] ?>');
        setCarinhaCheck('<?php echo $props['id'] ?>')" <?php echo $props['checked'] ?>>
      <?php
      echo $props['label']
      ?>
      <!-- Carinha Feliz -->
      <div style="display: <?php echo $displayIconLittleFace ?>;">
        <svg id="icon-status-dynamic-checked-feliz-<?php echo $props['id'] ?>" class=" icon-error-dynamic-input <?php echo $isVisibledIconFeliz ?>" width="22" height="22" viewBox="0 0 20 20" fill="#27ae60" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z" />
          <path d="M6.5 9C7.32843 9 8 8.32843 8 7.5C8 6.67157 7.32843 6 6.5 6C5.67157 6 5 6.67157 5 7.5C5 8.32843 5.67157 9 6.5 9Z" />
          <path d="M13.493 8.986C14.3176 8.986 14.986 8.31756 14.986 7.493C14.986 6.66844 14.3176 6 13.493 6C12.6684 6 12 6.66844 12 7.493C12 8.31756 12.6684 8.986 13.493 8.986Z" />
          <path d="M10 16C15 16 16 11 16 11H4C4 11 5 16 10 16Z" />
        </svg>
      </div>

      <!-- CArinha Triste -->
      <div style="display: <?php echo $displayIconLittleFace ?>;">
        <svg id="icon-status-dynamic-checked-triste-<?php echo $props['id'] ?>" class=" icon-error-dynamic-input invisible" width="22" height="22" viewBox="0 0 20 20" fill="#ff4d4d" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10ZM20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C8.68678 20 7.38642 19.7413 6.17317 19.2388C4.95991 18.7362 3.85752 17.9997 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10ZM8 7.5C8 8.3 7.3 9 6.5 9C5.7 9 5 8.3 5 7.5C5 6.7 5.7 6 6.5 6C7.3 6 8 6.7 8 7.5ZM15 7.5C15 8.3 14.3 9 13.5 9C12.7 9 12 8.3 12 7.5C12 6.7 12.7 6 13.5 6C14.3 6 15 6.7 15 7.5Z" />
          <path d="M14.1901 13.81C13.2901 12.73 11.7501 12 10.0001 12C8.25006 12 6.71006 12.73 5.81006 13.81L7.23006 15.23C7.68006 14.51 8.75006 14 10.0001 14C11.2501 14 12.3201 14.51 12.7701 15.23L14.1901 13.81Z" />
        </svg>
      </div>
    </div>
    <p id="text-error-dynamic-input-<?php echo $props['id'] ?>" class="checkbox-text-error text-error-dynamic-input noVisibled <?php echo $props['classTextError'] ?>">
      <?php echo $props['textError'] ?>
    </p>
  </div>

<?php
}
?>