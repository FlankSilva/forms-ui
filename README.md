# New Forms UI

Uma biblioteca PHP moderna para criação de formulários interativos com validação no lado do cliente.

## Requisitos

- PHP >= 7.4
- Composer

## Instalação

```bash
composer require cenariodev/new-forms-ui
```

## Configuração

Antes de usar os componentes, você precisa configurar o caminho para os assets:

```php
<?php
require 'vendor/autoload.php';

use CenarioDev\formUI;

// Configure o caminho para os assets
formUI\configure([
    'asset_path' => '/caminho/para/assets'
]);
```

## Assets Necessários

A biblioteca requer alguns assets para funcionar corretamente. Você precisa copiar a pasta `assets` do pacote para seu diretório público. A estrutura deve ser:

```
public/
  assets/
    images/
      checked.webp
      error.webp
      arrow.webp
    css/
      form.css
    scripts/
      form.js
      form.min.js
```

### Incluindo os Assets

Adicione os seguintes arquivos no seu HTML:

```html
<!-- CSS -->
<link rel="stylesheet" href="/assets/css/form.css" />

<!-- JavaScript -->
<script src="/assets/scripts/form.js"></script>
<!-- ou use a versão minificada -->
<script src="/assets/scripts/form.min.js"></script>
```

## Início Rápido

```php
<?php
require 'vendor/autoload.php';

use CenarioDev\formUI;

// Configure os assets
formUI\configure([
    'asset_path' => '/assets'
]);

// Exemplo de formulário básico
?>
<!DOCTYPE html>
<html>
<head>
    <title>Formulário Exemplo</title>
    <link rel="stylesheet" href="/assets/css/form.css">
</head>
<body>
    <form>
        <?php
        // Input de texto
        formUI\Input([
            'id' => 'nome',
            'placeholder' => 'Digite seu nome',
            'typeValidate' => 'text',
            'typeInput' => 'text'
        ]);

        // Select
        $options = [
            ['label' => 'Opção 1', 'value' => '1'],
            ['label' => 'Opção 2', 'value' => '2']
        ];
        formUI\Select($options, ['id' => 'selecao']);

        // Checkbox
        formUI\Checkbox([
            'id' => 'termos',
            'label' => 'Aceito os termos'
        ]);
        ?>
    </form>
    <script src="/assets/scripts/form.js"></script>
</body>
</html>
```

## Componentes Disponíveis

### Input

Componente de entrada de texto com validação e feedback visual.

#### Validações Suportadas

- `text`: Texto livre
- `email`: Endereço de e-mail
- `cpf`: CPF
- `cnpj`: CNPJ
- `phone`: Telefone
- `cep`: CEP (com busca de endereço)
- `date`: Data
- `number`: Números
- `password`: Senha

```php
<?php
formUI\Input([
    'id' => 'nome',
    'placeholder' => 'Digite seu nome',
    'typeValidate' => 'text',
    'typeInput' => 'text',
    'textError' => 'Campo obrigatório',
    'classContainer' => 'custom-container',
    'classContent' => 'custom-content',
    'classInput' => 'custom-input',
    'classIconError' => 'custom-icon',
    'classTextError' => 'custom-error',
    'iconLittleFace' => true
]);
```

### Select

Componente de seleção com opções personalizáveis.

```php
<?php
$options = [
    ['label' => 'Opção 1', 'value' => '1', 'status' => false],
    ['label' => 'Opção 2', 'value' => '2', 'status' => false]
];

formUI\Select($options, [
    'id' => 'selecao',
    'colorIcon' => '#000',
    'colorText' => '#000',
    'colorPlaceholder' => '#BCBCBC',
    'textError' => 'Selecione uma opção',
    'classDisplayContainer' => 'custom-container',
    'classSelect' => 'custom-select',
    'classOption' => 'custom-option',
    'classTextError' => 'custom-error',
    'iconLittleFace' => true
]);
```

### Checkbox

Componente de checkbox com validação.

```php
<?php
formUI\Checkbox([
    'id' => 'termos',
    'label' => 'Aceito os termos de uso',
    'checked' => false,
    'textError' => 'Você precisa aceitar os termos',
    'classTextError' => 'custom-error',
    'iconLittleFace' => true
]);
```

### RadioRestriction (Sim/Não)

Componente de seleção Sim/Não com estilo personalizado.

```php
<?php
formUI\RadioRestriction([
    'id' => 'confirmacao',
    'textError' => 'Selecione uma opção',
    'bgColor' => '#fff',
    'color' => '#bcbcbc',
    'bgColorHoverButton' => '#f88430',
    'colorTextHoverButton' => '#fff',
    'borderColor' => 'gray',
    'classContentButton' => 'custom-container',
    'classButton' => 'custom-button',
    'classTextError' => 'custom-error'
]);
```

## Estilização

Os componentes podem ser estilizados usando CSS. Aqui está um exemplo básico:

```css
/* Estilo para inputs */
.input-dynamic-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

/* Estilo para mensagens de erro */
.text-error-dynamic-input {
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
}

/* Estilo para o container do select */
.container-select-dynamic-select {
  position: relative;
  width: 100%;
}

/* Estilo para os botões Sim/Não */
.button-dynamic-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-dynamic-button:hover {
  background: #f88430;
  color: #fff;
}
```

## Características

- Validação em tempo real
- Feedback visual com ícones
- Estilização personalizável
- Suporte a máscaras de entrada
- Validação de CEP com busca de endereço
- Componentes responsivos
- Suporte a temas personalizados

## Contribuição

Contribuições são bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.
