<?php

use function CenarioDev\formUI\Input;

include 'src/components/input.php';
include 'src/components/select.php';
include 'src/components/checkbox.php';
include 'src/components/radio-restriction.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="src/assets/scripts/form.js"></script>
  <link rel="stylesheet" href="/form.css">

  <title>Document</title>
</head>

<body>
  <div class="container-input" style="background: #ddd; padding: 10px;">
    <form action="">
      <?php echo Select(
        $options = array(
          array('label' => 'Valor do empréstimo:', 'value' => '', 'status' => false),
          array('label' => 'R$ 1.000 a R$ 2.999', 'value' => '1000-2999', 'status' => false),
          array('label' => 'R$ 3.000 a R$ 5.999', 'value' => '3000-5999', 'status' => false),
          array('label' => 'R$ 6.000 a R$ 9.999', 'value' => '6000-9999', 'status' => false),
          array('label' => 'R$ 10.000 a R$ 19.999', 'value' => '10000-19999', 'status' => false),
          array('label' => 'R$ 20.000 a R$ 29.999', 'value' => '20000-29999', 'status' => false),
          array('label' => 'R$ 30.000 a R$ 39.999', 'value' => '30000-39999', 'status' => false),
          array('label' => 'R$ 40.000 a R$ 49.999', 'value' => '40000-49999', 'status' => false),
          array('label' => 'R$ 50.000 a R$ 99.999', 'value' => '50000-99999', 'status' => false),
          array('label' => 'R$ 100.000 a R$ 199.999', 'value' => '100000-199999', 'status' => false),
          array('label' => 'Acima de R$ 200.000', 'value' => '200001-200001', 'status' => false)
        ),
        $props = array(
          'id' => 'fltValorEmprestimo',
          'colorIcon' => '#000',
          'colorText' => '#000',
          'colorPlaceholder' => 'gray',
          'textError' => 'Selecione o valor do Empréstimo',
          'classDisplayContainer' => '',
          'clasContainerIcon' => '',
          'classArrowIcon' => '',
          'classSelect' => 'custon-select',
          'classOption' => 'options-select',
          'classTextError' => '',
          'iconLittleFace' => false
        )
      ) ?>

      <?php Input(
        $props = array(
          'id' => 'strNome',
          'placeholder' => 'Nome Completo',
          'typeValidate' => 'nome',
          'typeInput' => 'text',
          'textError' => 'Nome ínvalido',
          'classContainer' => '',
          'classContent' => '',
          'classInput' => '',
          'classIconError' => '',
          'classTextError' => '',
          'iconLittleFace' => true,
        )
      ); ?>

      <?php echo RadioRestriction(
        $props = array(
          'id' => 'restricao-sim',
          'textError' => 'Selecione SIM ou NÃO',
          'bgColor' => '#fff',
          'color' => '#707070',
          'bgColorHoverButton' => '#04BD34',
          'colorTextHoverButton' => '#fff',
          'borderColor'  => '#707070',
          'classContentButton' => 'custon-content-raios',
          'classButton' => 'custon-radio-button',
          'classTextError' => 'input-text-error'
        )
      ) ?>

      <?php echo Checkbox(
        $props = array(
          'id' => 'checkTermos',
          'label' => '
            <label class="termos-check custom-label-form custom-label-form2" for="checkTermos">
              Você aceita nossos
            </label>
          ',
          'checked' => 'checked',
          'textError' => 'Você deve aceitar os termos e politica',
          'classTextError' => '',
          'iconLittleFace' => false
        )
      ) ?>


    </form>
  </div>
</body>

</html>