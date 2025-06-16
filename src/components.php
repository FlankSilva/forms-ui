<?php

namespace CenarioDev\formUI;

// --- INÍCIO DO BLOCO DE CONFIGURAÇÃO ---
// Esta parte é a chave para o seu pacote funcionar em qualquer projeto.

global $formUiAssetPath;
$formUiAssetPath = ''; // Valor padrão para evitar erros.

/**
 * Função OBRIGATÓRIA para o usuário do seu pacote chamar.
 * Define o caminho público para a pasta de assets (imagens, etc).
 * O usuário do pacote fará isso uma vez no projeto dele.
 */
function configure(array $config): void
{
  global $formUiAssetPath;
  if (isset($config['asset_path'])) {
    $formUiAssetPath = rtrim($config['asset_path'], '/');
  }
}

// --- FIM DO BLOCO DE CONFIGURAÇÃO ---


/**
 * Criar o componente de input.
 * ... (sua documentação aqui) ...
 */
function Input(
  $props = array(
    'id' => '',
    'placeholder' => '',
    'typeValidate' => '',
    'typeInput' => '',
    'textError' => '',
    'classContainer' => '',
    'classContent' => '',
    'classInput' => '',
    'classIconError' => '',
    'classTextError' => '',
    'iconLittleFace' => true
  )
) {
  // Acessa a variável de configuração global.
  global $formUiAssetPath;

  $displayIconLittleFace = isset($props['iconLittleFace']) && empty($props['iconLittleFace']) ? 'none' : 'flex';
?>
  <style>
    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset !important;
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: #000 !important;
    }
  </style>
  <span id="status-input-<?php echo htmlspecialchars($props['id']); ?>" style="display: none;"></span>

  <div class="container-dynamic-input <?php echo htmlspecialchars($props['classContainer']); ?>" id="container-card-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>">
    <div class="content-dynamic-input custon-container-input <?php echo htmlspecialchars($props['classContent']); ?>">
      <input
        id="<?php echo htmlspecialchars($props['id']); ?>"
        class="<?php echo htmlspecialchars($props['classInput']); ?> input-dynamic-input" type="<?php echo htmlspecialchars($props['typeInput']); ?>"
        name="<?php echo htmlspecialchars($props['typeValidate']); ?>" placeholder="<?php echo htmlspecialchars($props['placeholder']); ?>"
        oninput="inputValidateUnitValue(
          '<?php echo htmlspecialchars($props['id']); ?>'); 
          maskInput('<?php echo htmlspecialchars($props['id']); ?>', '<?php echo htmlspecialchars($props['typeValidate']); ?>');
          maxLengthInput('<?php echo htmlspecialchars($props['id']); ?>', '<?php echo htmlspecialchars($props['typeValidate']); ?>'
        )">
      <div id="spiner-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>" class="spiner-dynamic-input invisible"></div>
      <div style="display: <?php echo $displayIconLittleFace; ?>;">
        <img id="icon-status-dynamic-input-feliz-<?php echo htmlspecialchars($props['id']); ?>"
          src="<?php echo htmlspecialchars($formUiAssetPath); ?>/images/checked.webp"
          alt="Status Neutro"
          class=" invisible  <?php echo htmlspecialchars($props['classIconError']); ?>"
          width="12" height="12" />
      </div>
      <div style="display: <?php echo $displayIconLittleFace; ?>;">
        <img id="icon-status-dynamic-input-triste-<?php echo htmlspecialchars($props['id']); ?>"
          src="<?php echo htmlspecialchars($formUiAssetPath); ?>/images/error.webp"
          alt="Status Neutro"
          class=" invisible <?php echo htmlspecialchars($props['classIconError']); ?>"
          width="8" height="8" />
      </div>
    </div>
    <p id="text-error-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>" class="input-text-error text-error-dynamic-input noVisibled <?php echo htmlspecialchars($props['classTextError']); ?>">
      <?php echo htmlspecialchars($props['textError']); ?>
    </p>

    <?php if ($props['typeValidate'] === 'cep'):
      $inputID = htmlspecialchars($props['id']);
      echo "<input class='' id='rIdEstados-$inputID'  type='text' name='rIdEstados-$inputID' hidden />";
      echo "<input class='' id='rIdCidades-$inputID'  name='rIdCidades-$inputID' value='' hidden />";
      echo "<input class='' id='ddd-Cidades-$inputID'  name='ddd-Cidades-$inputID'  value='' hidden />";
    endif; ?>
  </div>
<?php
}


/**
 * Criar o componente de Select.
 * ... (sua documentação aqui) ...
 */
function Select(
  $options = array(array('label' => 'Label1', 'value' => 'label1', 'status' => false)),
  $props = array(
    'id' => '',
    'colorIcon' => '#000',
    'colorText' => '#000',
    'colorPlaceholder' => '#BCBCBC',
    'textError' => 'Campo ínvalido',
    'classDisplayContainer' => '',
    'clasContainerIcon' => '',
    'classArrowIcon' => '',
    'classSelect' => '',
    'classOption' => '',
    'classTextError' => '',
    'iconLittleFace' => false
  )
) {
  // Acessa a variável de configuração global.
  global $formUiAssetPath;

  $displayIconLittleFace = isset($props['iconLittleFace']) && empty($props['iconLittleFace']) ? 'none' : 'flex';
?>
  <div class="container-select-dynamic-select">
    <div class="display-dynamic-select display-select <?php echo htmlspecialchars($props['classDisplayContainer']); ?>" id="container-card-dynamic-select-<?php echo htmlspecialchars($props['id']); ?>">
      <select
        style="z-index: 999;"
        name="required"
        id="<?php echo htmlspecialchars($props['id']); ?>"
        class="input-dynamic-input select-dynamic-select <?php echo htmlspecialchars($props['classSelect']); ?>"
        onchange="
          inputValidateUnitValue('<?php echo htmlspecialchars($props['id']); ?>'); 
          custonSelect('<?php echo htmlspecialchars($props['id']); ?>', '<?php echo htmlspecialchars($props['colorText']); ?>', '<?php echo htmlspecialchars($props['colorPlaceholder']); ?>')">
        <?php foreach ($options as $option): ?>
          <option style="color: <?php echo htmlspecialchars($props['colorText']); ?>;" class="<?php echo htmlspecialchars($props['classOption']); ?>" value="<?php echo htmlspecialchars($option['value']); ?>">
            <?php echo htmlspecialchars($option['label']); ?>
          </option>
        <?php endforeach; ?>
      </select>
      <div class="icons-dynamic-select <?php echo htmlspecialchars($props['clasContainerIcon']); ?>">
        <div class="icon-face-dynamic-select icon-arraw-dinamic-select">
          <img
            src="<?php echo htmlspecialchars($formUiAssetPath); ?>/images/arrow.webp"
            alt="Status Neutro"
            class="<?php echo htmlspecialchars($props['classArrowIcon']); ?>"
            width="13" height="8" />
        </div>
        <!-- Ícones SVG (não precisam de mudança) -->
        <div style="display: none;" class="">...</div>
        <div style="display: <?php echo $displayIconLittleFace; ?>;" class="<?php echo $displayIconLittleFace ? 'icon-face-dynamic-select' : ''; ?> icon-face-dynamic-select">...</div>
        <div style="display: <?php echo $displayIconLittleFace; ?>;" class="<?php echo $displayIconLittleFace ? 'icon-face-dynamic-select' : ''; ?> icon-face-dynamic-select">...</div>
      </div>
    </div>
    <p id="text-error-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>" class="text-error-dynamic-input select-text-error noVisibled <?php echo htmlspecialchars($props['classTextError']); ?>">
      <?php echo htmlspecialchars($props['textError']); ?>
    </p>
  </div>
<?php
}


/**
 * Criar o componente de Checkbox.
 * ... (sua documentação aqui) ...
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
    <span id="status-checked-dynamic-select-<?php echo htmlspecialchars($props['id']); ?>" style="display: none;">
      <?php echo $isCkecked; ?>
    </span>
    <div class="content-dynamic-termos">
      <input
        type="checkbox"
        id="<?php echo htmlspecialchars($props['id']); ?>"
        class="input-dynamic-input custon-input-checked"
        name="required"
        onclick="inputValidateUnitValue('<?php echo htmlspecialchars($props['id']); ?>');
        setCarinhaCheck('<?php echo htmlspecialchars($props['id']); ?>')" <?php echo $props['checked'] ? 'checked' : ''; ?>>
      <?php echo $props['label']; ?>
      <!-- Ícones SVG (não precisam de mudança) -->
      <div style="display: <?php echo $displayIconLittleFace; ?>;">...</div>
      <div style="display: <?php echo $displayIconLittleFace; ?>;">...</div>
    </div>
    <p id="text-error-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>" class="checkbox-text-error text-error-dynamic-input noVisibled <?php echo htmlspecialchars($props['classTextError']); ?>">
      <?php echo htmlspecialchars($props['textError']); ?>
    </p>
  </div>
<?php
}


/**
 * Criar o componente de YesNo (RadioRestriction).
 * ... (sua documentação aqui) ...
 */
function RadioRestriction(
  $props = array(
    'id' => '',
    'textError' => 'Campo ínvalido',
    'bgColor' => '#fff',
    'color' => '#bcbcbc',
    'bgColorHoverButton' => '#f88430',
    'colorTextHoverButton' => '#fff',
    'borderColor' => 'gray',
    'classContentButton' => '',
    'classButton' => '',
    'classTextError' => ''
  )
) {
?>
  <div class="container-dynamic-button">
    <input name="required" id="checked-<?php echo htmlspecialchars($props['id']); ?>" style="display: none;" type="checkbox">
    <input class="input-dynamic-input" style="display: none; " id="<?php echo htmlspecialchars($props['id']); ?>" type="checkbox">
    <div class="content-dynamic-button <?php echo htmlspecialchars($props['classContentButton']); ?>">
      <button id="btn-label-yes-dynamic-button-<?php echo htmlspecialchars($props['id']); ?>" type="button" style="..." class="button-dynamic-button <?php echo htmlspecialchars($props['classButton']); ?>" onclick="...">Sim</button>
      <button id="btn-label-no-dynamic-button-<?php echo htmlspecialchars($props['id']); ?>" type="button" style="..." class="button-dynamic-button <?php echo htmlspecialchars($props['classButton']); ?>" onclick="...">Não</button>
    </div>
    <p id="text-error-dynamic-input-<?php echo htmlspecialchars($props['id']); ?>" class="text-error-dynamic-input noVisibled <?php echo htmlspecialchars($props['classTextError']); ?>">
      <?php echo htmlspecialchars($props['textError']); ?>
    </p>
  </div>
<?php
}
