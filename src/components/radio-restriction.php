<?php

/**
 * Criar o componente de YesNo.
 * Para pergar o valor selecionado do component, utilize o getElementById pelo id ***"checked-ID"***,
 * onde esse ***'ID'*** e o mesmo que foi passado como parametro.
 * Será retornado ***true(SIM)*** ou ***false(NAO)***
 * Exemplo: const checked = document.getElementById('checked-MEUID').checked
 * 
 * @param label: A label deve ser passada como tag customizada em formato de string, seguindo o exemplo:.
 * <label class="" for="checkTermos">Lorem ipsun</label>.
 * @param
 * @param 

 */

function RadioRestriction(
  $props = array(
    'id' => '',
    'textError' => 'Campo ínvalido',
    'bgColor' => '#fff',
    'color' => '#bcbcbc',
    'bgColorHoverButton' => '#f88430',
    'colorTextHoverButton' => '#fff',
    'borderColor'  => 'gray',
    'classContentButton' => '',
    'classButton' => '',
    'classTextError' => ''
  )
) {
?>


  <div class="container-dynamic-button">
    <input name="required" id="checked-<?php echo $props['id'] ?>" style="display: none;" type="checkbox"> <!-- salva true(SIM) ou false(NAO) -->
    <input class="input-dynamic-input" style="display: none; " id="<?php echo $props['id'] ?>" type="checkbox">

    <div class="content-dynamic-button <?php echo $props['classContentButton'] ?>">
      <button id="btn-label-yes-dynamic-button-<?php echo $props['id'] ?>" type="button" style="background-color: <?php echo $props['bgColor'] ?>; color: <?php echo $props['color'] ?>; border: 1px solid <?php echo $props['borderColor'] ?>;" class="button-dynamic-button <?php echo $props['classButton'] ?>" onclick="
          setValueYesNo(
            'SIM', 
            '<?php echo $props['id'] ?>', 
            '<?php echo $props['bgColorHoverButton'] ?>', 
            '<?php echo $props['colorTextHoverButton'] ?>',
            '<?php echo $props['bgColor'] ?>',
            '<?php echo $props['color'] ?>'
          );
          inputValidateUnitValue('<?php echo $props['id'] ?>')
        ">
        Sim
      </button>
      <button id="btn-label-no-dynamic-button-<?php echo $props['id'] ?>" type="button" style="background-color: <?php echo $props['bgColor'] ?>; color: <?php echo $props['color'] ?>; border: 1px solid <?php echo $props['borderColor'] ?>;" class="button-dynamic-button <?php echo $props['classButton'] ?>" onclick="
          setValueYesNo(
            'NAO', 
            '<?php echo $props['id'] ?>', 
            '<?php echo $props['bgColorHoverButton'] ?>', 
            '<?php echo $props['colorTextHoverButton'] ?>',
            '<?php echo $props['bgColor'] ?>',
            '<?php echo $props['color'] ?>'
          );
          inputValidateUnitValue('<?php echo $props['id'] ?>')
        ">
        Não
      </button>
    </div>
    <p id="text-error-dynamic-input-<?php echo $props['id'] ?>" class="text-error-dynamic-input noVisibled <?php echo $props['classTextError'] ?>">
      <?php echo $props['textError'] ?>
    </p>
  </div>

<?php
}
?>