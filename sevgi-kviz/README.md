# Sevgi Kviz 💌

Sevgan insoningiz uchun tayyorlangan kichkina, shaxsiy kviz-sayt. Instagram-story
uslubidagi dizayn: 5 ta savol → javoblar recap → oxirida romantik xabar va yurak animatsiyasi.
Ba'zi javob tugmalari (masalan "Yo'q") "injiq" — bosilganda 1-2 marta qochib ketadi 😄

## Ishga tushirish

```
mvn spring-boot:run
```

yoki

```
mvn clean package
java -jar target/sevgi-kviz-1.0.0.jar
```

Keyin brauzerda oching: `http://localhost:8080`

## Ismi o'zgartirish

`src/main/resources/application.properties` faylida:

```
kviz.ismi=Sarvinoz
```

shu qatordagi ismni o'zgartiring — sahifaning boshida avtomatik chiqadi.

## Matnni tahrirlash

- Savollar va javob variantlari: `src/main/resources/static/js/quiz.js` faylidagi
  `questions` massivi ichida.
- Oxirgi (final) xabar matnlari: `src/main/resources/templates/index.html`
  faylidagi `#finalLines` bo'limida.
- Ranglar/shrift: `src/main/resources/static/css/style.css`.

## Internetga chiqarish (link sifatida yuborish uchun)

Eng oson yo'l — loyihani bepul bir hosting'ga deploy qilish, masalan:
- Render.com (Spring Boot uchun "Web Service" sifatida, buildCommand: `mvn clean package`,
  startCommand: `java -jar target/sevgi-kviz-1.0.0.jar`)
- Railway.app
- Yoki oddiy VPS/serverda `java -jar` bilan ishga tushirish

Deploy qilingandan so'ng olingan URL'ni (masalan `https://sevgi-kviz.onrender.com`)
sevgilingizga yuborishingiz mumkin — xuddi rasmdagi Telegram xabaridagidek 💌
