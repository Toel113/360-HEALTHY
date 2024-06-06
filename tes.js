<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clinic Code</title>
</head>
<body>
  <h1>Clinic Code</h1>
  <div id="code"></div>
  <button id="fetchCodeButton">Fetch Next Code</button>

  <script>
    function fetchNextCode() {
      fetch('/get-next-code')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            document.getElementById('code').innerText = 'Next Code: ' + data.code;
          } else {
            document.getElementById('code').innerText = 'ไม่พบ idcode ถัดไปที่เป็นไปตามเงื่อนไข';
          }
        })
        .catch(error => console.error('Error fetching next code:', error));
    }

    document.getElementById('fetchCodeButton').addEventListener('click', fetchNextCode);
  </script>
</body>
</html>
