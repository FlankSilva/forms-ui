# CenarioDev Form-UI

Biblioteca de componentes de formulário PHP com validação e interatividade no lado do cliente.

## Instalação

```bash
composer require cenariodev/new-forms-ui
```

## Configuração Obrigatória

Este pacote requer que os arquivos de **CSS, JavaScript e Imagens** sejam acessíveis publicamente.

**1. Copie a pasta `assets`:**

Copie toda a pasta `assets` de `vendor/cenariodev/new-forms-ui/assets` para uma pasta pública do seu projeto. Uma boa prática é criar uma pasta para assets de pacotes, por exemplo: `public/vendor/form-ui/`.

**Após copiar, você terá a seguinte estrutura no seu projeto:**

```
public/
└── vendor/
    └── form-ui/
        ├── css/
        │   └── form.css
        ├── js/
        │   └── seu-arquivo-de-validacao.js
        └── images/
            └── ...
```

**2. Inclua o CSS e o JavaScript no seu HTML:**

Adicione as tags `<link>` e `<script>` no seu template. O `<link>` vai no `<head>` e o `<script>` geralmente vai antes de fechar a tag `</body>`.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meu Formulário</title>
    <!-- PASSO 2a: Inclua o CSS do pacote -->
    <link rel="stylesheet" href="/vendor/form-ui/css/form.css" />
  </head>
  <body>
    <!-- Seus componentes PHP aqui -->

    <!-- PASSO 2b: Inclua o JavaScript do pacote -->
    <script src="/vendor/form-ui/js/seu-arquivo-de-validacao.js"></script>
  </body>
</html>
```

**3. Configure o Caminho dos Assets no PHP:**

Antes de chamar qualquer componente, configure o caminho para a pasta de assets que você copiou, para que os componentes possam encontrar as **imagens**.

```php
<?php
require 'vendor/autoload.php';

// O caminho aqui NÃO inclui a pasta /images
\CenarioDev\formUI\configure([
    'asset_path' => '/vendor/form-ui'
]);
?>
```

## Uso

Agora você pode usar os componentes normalmente.

```php
<?php
use function CenarioDev\formUI\Input;

Input([
    'id' => 'meu-cpf',
    'placeholder' => 'Digite seu CPF',
    'typeValidate' => 'cpf'
]);
?>
```
