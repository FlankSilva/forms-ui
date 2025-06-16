<?php

namespace CenarioDev\formUI;

/**
 * Criar o componente de input.
 * Para pergar o retono do status de todos os inputs, utilize a função ***inputValidateValue()***,
 * armazenando em uma variavel o retorno ***true*** ou ***false***.
 * Exemplo: const status = inputValidateValue().
 * Caso seu Form tenha um input do tipo CEP, passe o id dentro da função inputValidateValue(''), na função de submit
 * @param classContainer: Estilizar div global, contendo todos os elementos.
 * @param classContent: Estilizar div, contendo o input e o icone.
 * @param classInput: Estilizar o input.
 * @param classIconError: Estilizar o icone.
 * @param classTextError: Estilizar o texto de erro.
 * @param typeValidate: 'nome' | 'cpf' | 'cnpj' | 'cpfcnpj' | 'datanasc' | 'email' | 'cel' | 'tel' | 
 * 'celreq' | 'telreq' | 'telreq' | 'telcel' | 'cep' | 'required' | 'banks' | 
 * 'cidade-nascimento' | 'numbers' | 'datExpedicao' | 'datNascimentoEmprestimo' | 
 * 'renda-mensal' | 'parcelas' | 'confirma-senha' | 'senha' | 'null'.
 * @param 
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
  $host = explode(":", $_SERVER['HTTP_HOST']);

  if ($host[0] == 'localhost') {
    $root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . "";
  } else {
    $root = (!empty($_SERVER['HTTPS']) ? 'https' : 'https') . '://' . $_SERVER['HTTP_HOST'];
  }

  $displayIconLittleFace = isset($props['iconLittleFace']) && empty($props['iconLittleFace']) ? 'none' : 'flex';
?>

  <style>
    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset !important;
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: #000 !important;
    }
  </style>
  <span id="status-input-<?php echo $props['id'] ?>" style="display: none;"></span>

  <div class="container-dynamic-input  <?php echo $props['classContainer'] ?>" id="container-card-dynamic-input-<?php echo $props['id'] ?>">
    <div class="content-dynamic-input custon-container-input <?php echo $props['classContent'] ?>">
      <input
        id="<?php echo $props['id'] ?>"
        class="<?php echo $props['classInput'] ?> input-dynamic-input" type="<?php echo $props['typeInput'] ?>"
        name="<?php echo $props['typeValidate'] ?>" placeholder="<?php echo $props['placeholder'] ?>"
        oninput="inputValidateUnitValue(
          '<?php echo $props['id'] ?>'); 
          maskInput('<?php echo $props['id'] ?>', '<?php echo $props['typeValidate'] ?>');
          maxLengthInput('<?php echo $props['id'] ?>', '<?php echo $props['typeValidate'] ?>'
        )
        ">
      <!-- Carinha -->

      <div id="spiner-dynamic-input-<?php echo $props['id'] ?>" class="spiner-dynamic-input invisible"></div>

      <!-- Carinha Feliz -->
      <div style="display: <?php echo $displayIconLittleFace ?>;">
        <img id="icon-status-dynamic-input-feliz-<?php echo $props['id'] ?>"
          src="<?php echo $root; ?>/src/assets/images/checked.webp"
          alt="Status Neutro"
          class=" invisible  <?php echo $props['classIconError'] ?>"
          width="12" height="12" />
      </div>

      <!-- CArinha Triste -->
      <div style="display: <?php echo $displayIconLittleFace ?>;">
        <img id="icon-status-dynamic-input-triste-<?php echo $props['id'] ?>"
          src="<?php echo $root; ?>/src/assets/images/error.webp"
          alt="Status Neutro"
          class=" invisible <?php echo $props['classIconError'] ?>"
          width="8" height="8" />
      </div>
    </div>
    <p id="text-error-dynamic-input-<?php echo $props['id'] ?>" class="input-text-error text-error-dynamic-input noVisibled <?php echo $props['classTextError'] ?>">
      <?php echo $props['textError'] ?>
    </p>


    <!-- hidden -->
    <?php
    if ($props['typeValidate'] === 'cep') {
      $inputID = $props['id'];

      echo "
          <input class='' id='rIdEstados-$inputID'  type='text' name='rIdEstados-$inputID' hidden />
          <input class='' id='rIdCidades-$inputID'  name='rIdCidades-$inputID' value='' hidden />
          <input class='' id='ddd-Cidades-$inputID'  name='ddd-Cidades-$inputID'  value='' hidden />
        ";
    };
    ?>
  </div>
<?php
}
?>