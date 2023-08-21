
# Website Blocker

Website Blocker adalah ekstensi untuk browser chrome dan edge, fungsi utama dari ekstensi ini adalah untuk mengunci semua website di internet kecuali untuk website yang di beri izin untuk di akses.		
ekstensi ini juga menginject semacam trigger yang akan aktif jika user beralih dari window tab, dengan begitu user bisa fokus dengan page yang sedang di gunakan.

## Cara pemasangan

- Buka menu ekstensi di browser (edge/chrome) 
- Aktifkan mode developer
- Pilih menu "Load Unpacked"
- Pilih folder ekstesni ("Poems of a machine")
- Aktifkan ekstensi

## Cara penggunaan
Ada dua tombol di dalam ekstensi, yang pertama adalah Checkbox yang kedua adalah Button

- Chechbox adalah tombol utama, dimana saat di aktifkan maka ekstensi akan aktif
- Button (Inject Js) adalah tombol tambahan, fungsinya untuk inject tag <script> kedalam html web yang sedang kita kunjungi, isi dari <script> yang di inject adalah event listener yang mendeteksi status blur pada window
## Mengatur akses web

Di dalam file content.js ada variable untuk mengatur izin domain, masukan nama domain dari web yang di izinkan untuk di buka saat ekstensi aktif.

Untuk mengecek nama domain web, kalian bisa gunakan kode berikut di console. 
```javascript
window.location.hostname
```
Ubah isi dari "allowedDomains"     
contoh : ['github.com', 'youtube.com', 'google.com']
```javascript
function applyBlocking(blockingEnabled) {
  const allowedDomains = ['github.com'];
  const currentDomain = window.location.hostname;

  if (!allowedDomains.includes(currentDomain) && blockingEnabled) {
    document.documentElement.innerHTML = '';
  } 
}
```

## Mengatur halaman error dan trigger
Pada file background.js, di dalam fungsi "handleVisibilityChange()" kalian dapat mengatur tampilan dari halaman erorr.
```javascript
        function handleVisibilityChange() {
          if (document.hidden) {
            /* Bagian yang dapat di rubah
            document.body.innerHTML = '';
            alert('Page content deleted');
            document.documentElement.style.backgroundColor = "red";
            document.documentElement.style.fontSize = "100px";
            document.body.innerHTML = 'Error ronin is not responding, currently Dancing in the room Number 10884';
            */
            deg=setTimeout(check,2000);
          } else {
            if (deg) {
              clearTimeout(deg);
            }
          }
        }
```
Kalian juga dapat mengubah trigger dari halaman error dengan mengubah parameter dari if statement
```javascript
//contoh 1
if (document.hidden)

//contoh 2
if (!window.hasFocus())

//contoh 3
if (document.document.visibilityState === "hidden")

/*
Di ekstensi ini aku menggunakan campuran dari contoh2 dan contoh3, 
alasanya karena lebih sensitif dan dapat mendeteksi alt+tab dengan segera,
dan dapat bekerja di web dengan iframe karena menggunakan 2 eventListener
(window.blur & visibilitychange)

jika ingin menurunkan sesitifitas kalian bisa menggantinya dengan
contoh1 atau contoh3
*/
```


## Author

- [@Ifarra](https://www.github.com/Ifarra)

Aku membuat ekstensi ini untuk membuatku fokus pada sesi belajar yang aku lakukan, ini sangat membantuku mengurangi distraksi saat belajar :)

