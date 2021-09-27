module.exports = {
  getHTML: (HOST, code, email) =>
    `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background:  #302636;
      font-family: 'Nunito', sans-serif;
      font-size: 1.25rem;
      color:  #ffffff;
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .center {
      text-align: center;
    }
    html {
      height: 100%;
    }
    div.item {
      text-align: center;
    }
    img {
      margin-top: 5%;
      width: 75px;
      height: 75px;
    }
    .caption {
      display: block;
    }
  </style>
</head>
<body>
  <div class="item center">
<!--      <img src="logo.png" alt="it bg logo">-->
      <p>• IT-BG News • ` +
    new Date().getFullYear() +
    ` •</p>
      <span class="caption">
        <a href="${HOST}/verify?token=${code}&email=${email}">Натиснете тук, за да промените своята парола в IT-BG News.</a>
        Кодът е валиден 5 минути.
      </span>
      <span>
        Ако не сте заявили промяна на паролата, изтрийте този имейл. Не са нужни по-нататъчни действия.
      </span>
  </div>
</body>
</html>`,
};

// <p>• IT-BG News • <script>document.write(new Date().getFullYear())</script> •</p>
