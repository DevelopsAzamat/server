<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Neocities + API</title>
</head>
<body>
  <h1>Тест внешнего API</h1>
  <button id="load">Загрузить данные</button>
  <pre id="out"></pre>

  <script>
    document.getElementById("load").addEventListener("click", async () => {
      try {
        const res = await fetch("https://myapi.onrender.com/data");
        const json = await res.json();
        document.getElementById("out").textContent = JSON.stringify(json, null, 2);
      } catch (err) {
        console.error(err);
        document.getElementById("out").textContent = "Ошибка: " + err;
      }
    });
  </script>
</body>
</html>
