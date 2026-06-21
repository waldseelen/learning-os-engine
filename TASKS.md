

---

# 🚀 AGENT PROMPT — Learning OS (Vite + React Migration v2)

Sen bir senior frontend engineer’sin. Mevcut “Learning OS” projesini tek dosya HTML yapısından çıkarıp **Vite + React mimarisine** taşıyacaksın.

---

## 📦 MEVCUT PROJE DURUMU

Proje şu anda:

* Tek HTML/CSS/JS dosyası
* İçinde:

  * Prompt generator engine
  * Modül sistemi (knowledge modules)
  * Preset sistemi
  * AI export router (Gemini / ChatGPT / Claude / Perplexity URL)
  * LocalStorage state
* Ayrıca:

  * `tasks.md` içinde geliştirme planı mevcut aşağıya bakınız

---

## 🎯 ANA HEDEF

Aynı feature seti bozmadan:

👉 Vite + React tabanlı, modüler, ölçeklenebilir bir “Prompt Engineering OS” oluştur.

---

## 🧱 ZORUNLU MİMARİ (OVERSPLIT YOK)

Aşağıdaki yapıdan sapma:

```
src/
 ├── components/   (UI katmanı)
 ├── engine/       (prompt logic core)
 ├── data/         (modules + presets)
 ├── hooks/        (state management)
 ├── utils/        (AI router + helpers)
```

---

## ⚙️ ENGINE KATMANI (KRİTİK)

Tüm akıl yürütme burada olacak:

`/engine/promptCompiler.js`

İçerik:

* generatePrompt(config, selectedModules)
* dependency resolver (requires system)
* preset injection logic
* prompt validation (length guard)
* module composition pipeline

⚠️ UI içinde prompt logic ASLA olmayacak

---

## 🧩 MODULE SYSTEM

Modüller tamamen **data-driven** olacak:

```js
{
  id,
  title,
  description,
  prompt,
  requires: []
}
```

Kurallar:

* Modül = sadece veri
* Logic yok
* Dependency desteklenmeli
* Quiz gibi modüller otomatik önerilebilmeli

---

## 🧠 STATE MANAGEMENT

Seçenek:

* Zustand (tercih edilen)
  veya
* React Context (minimum)

State:

* selectedModules
* config (topic, domain, level, mode)
* generatedPrompt

---

## 🌐 AI ROUTER

Ayrı util:

`/utils/aiRouter.js`

Destek:

* ChatGPT → [https://chatgpt.com/?q=](https://chatgpt.com/?q=)
* Claude → [https://claude.ai/new?q=](https://claude.ai/new?q=)
* Perplexity → [https://www.perplexity.ai/search?q=](https://www.perplexity.ai/search?q=)
* Gemini → [https://gemini.google.com/app?prompt=](https://gemini.google.com/app?prompt=)

Özellik:

* URL length guard
* overflow → clipboard fallback

---

## 🧠 KRİTİK FEATURE’LAR (KORUNACAK)

Mevcut sistem aynen taşınmalı:

* Modül seçme sistemi
* Presetler (hizli, derin, sinav vs)
* Prompt preview
* LocalStorage persist
* AI export buttons

---

## ⚠️ YASAKLAR

* Tek dosya React component (God component) YAPMA
* Prompt logic UI içine gömme
* 20+ micro abstraction yapma
* Over-engineering yapma
* Backend ekleme (gerekmiyor)

---

## 🧠 TASARIM FELSEFESİ

Bu bir:

> “Prompt Generator” değil
> “Learning Operating System”dir

Bu yüzden:

* Modüller plug-in gibi çalışmalı
* Engine deterministik olmalı
* UI sadece renderer olmalı

---

## 🎯 ÇIKTI

Tam çalışan:

* Vite + React project
* Modüler architecture
* Aynı feature set (bozulmadan)
* Daha temiz engine layer
* Genişletilebilir modül sistemi

---

## 🚀 BONUS (İSTEĞE BAĞLI)

Eğer mümkünse ekle:

* dependency auto-suggestion
* module hover explain system
* prompt size warning UI
* preset preview system

---

hazırlayayım.








yeni featurelar!!!

ChatGPT: https://chatgpt.com/?q=[sorgu]Claude: https://claude.ai/new?q=[sorgu]Perplexity: https://www.perplexity.ai/search?q=[sorgu


bu 3 AI hizmeti ile ve geminiyle bberaber 4 hizmet olacak kişiş ssecebilecek



1. Dinamik Modül Bağımlılıkları (Dependency Tree)
Bazı modüller doğası gereği birbirini besler. Örneğin kullanıcı "Quiz" modülünü seçtiyse, konunun yapı taşlarını çıkaran "Ontoloji" modülünün de otomatik (veya tavsiye edilerek) seçilmesi prompt kalitesini artırır. Küçük bir requires: ['ontoloji'] objesi eklenebilir.


2. monolog modu
Modeller artık akıl yürütme (Reasoning/O1/Gemini Thinking) yeteneklerine sahip. Prompt şablonunun içine, eğer model destekliyorsa <thinking> sürecini tetikleyecek şu parametrik satır eklenebilir:

"Her modülü yanıtlamadan önce, konunun sınır koşullarını kendi iç sesinle (internal monologue) en az 3 farklı açıdan değerlendir." fakat çıktıda verme bu yanıtı geliştirmek için kulalnılmaıdır



3. "Gemini'de Aç" URL Karakter Sınırı Kontrolü
openGemini() fonksiyonunda promptu GET parametresi (?prompt=...) olarak URL'ye gömmüşsün. Bu harika bir pratik ama tarayıcıların URL karakter sınırı (genellikle ~2000-8000 karakter arası) vardır. Tüm modüller seçildiğinde üretilen devasa prompt URL sınırına takılıp kırılabilir. Oraya küçük bir karakter kontrolü veya "Çok uzun, panoya kopyalandı, doğrudan yapıştırın" uyarısı eklenebili


“Konu grafiği (knowledge map)”

Şu an lineer düşünüyorsun.

Ek:

Konunun alt bileşenlerini bir DAG (yönlü grafik) olarak çıkar:
- düğümler
- bağımlılıklar
- kritik noktalar

Bunu ASCII bile çizebilirsin:

A → B → D
  → C → D


Veya diagramlar


1. Parçacıkların Üretilmesi ve DolanıklıkAynı kaynaktan çıkan iki parçacık (A ve B) birbirine bağlanır. Bu aşamada her iki parçacık da hem yukarı (\(\uparrow \)) hem aşağı (\(\downarrow \)) dönme (spin) durumundadır. Yani durumları belirsizdir.text    [ Dolanık Parçacık Kaynağı ]
           /           \
          /             \
         v               v
    Parçacık A       Parçacık B
    (Spin: ??)       (Spin: ??)
Use code with caution.2. Parçacıkların Birbirinden UzaklaşmasıBu iki parçacık uzayın iki farklı ucuna (örneğin iki farklı galaksiye) gönderilir. Aradaki mesafe ne kadar büyük olursa olsun bağ kopmaz.textParçacık A                                              Parçacık B
(Spin: ??) <=========================================> (Spin: ??)
                        (Kuantum Bağı)
Use code with caution.3. Ölçüm ve Durumun NetleşmesiParçacık A gözlemlendiği an kuantum durumu çöker ve net bir yön alır (Örn: Yukarı). O anda, aralarında hiçbir sinyal alışverişi olamayacak kadar uzak olmalarına rağmen, Parçacık B anında zıt yönü (Aşağı) alır.text    Gözlemci A                                              Gözlemci B

       |                                                       |
       v (Ölçüm yapıldı)                                       v (Anında tetiklendi)
 [Parçacık A: ⬆️] < - - - - - - - - - - - - - - - - - - - > [Parçacık B: ⬇️]
Use code with caution.






🔥 4. Çok güçlü upgrade: “Çelişki modu”

Şu prompt sistemi en çok burada güçlenir:

Bu konunun içindeki paradoksları ve çelişkileri bul.
- Hangi durumlarda teori kırılır?
- Hangi varsayımlar gizli?

Bu seni yüzeyden çıkarır → araştırma seviyesine taşır.





ÖNEMLİ FEATURE


modüllerin üzerine gelindiğini ufak bi hover açılır ve eğer o modeüla cılırsa nolcağını detaylandırır ve amacı söyler vesaire






yeni modüller eklenecek !!!



## 🗺️ Ön Koşul Haritası

**Amaç:** Bu konuyu anlamadan önce ne bilinmeli?

```text
Bu konuyu öğrenmek için gerekli ön koşul bilgileri sırala.

- Zorunlu ön bilgiler
- Faydalı ön bilgiler
- Gereksiz görünen ama işimi kolaylaştıracak bilgiler

Bir öğrenme ağacı oluştur.
```

---

## 🎯 Öğrenme Sırası

**Amaç:** Konuyu hangi sırayla öğrenmeliyim?

```text
Bu konuyu öğrenmek için en verimli öğrenme sırasını oluştur.

Her aşama için:
- Hedef
- Öğrenilecek kavramlar
- Başarı kriteri
```

---

## 🔍 Gizli Varsayımlar

**Amaç:** Teorinin altında ne saklı?

```text
Bu konu hangi varsayımlar üzerine kuruludur?

- Açık varsayımlar
- Gizli varsayımlar
- Varsayım bozulursa ne olur?
```

Bu özellikle fizik, ekonomi ve matematikte çok güçlü.

---

## 🧱 Bilgi İnşası

**Amaç:** Konuyu sıfırdan kurmak.

```text
Bu konuyu insanlık hiç bilmiyormuş gibi sıfırdan yeniden keşfet.

Her adımda:
- Karşılaşılan problem
- Üretilen çözüm
- Yeni ortaya çıkan sorun
```

---

## ⚔️ Rakip Teoriler

**Amaç:** Alternatifleri görmek.

```text
Bu konuya alternatif yaklaşımlar nelerdir?

- Güçlü yönleri
- Zayıf yönleri
- Hangi durumda üstün oldukları
```

---

## 🧪 Düşünce Deneyi

**Amaç:** Zihinde çalıştırmak.

```text
Bu konuyu anlamam için 3 düşünce deneyi oluştur.

Sonucu hemen verme.
Önce tahmin etmemi iste.
```

---

## 🔄 Tersine Mühendislik

**Amaç:** Sonuçtan sebebe gitmek.

```text
Bu sistemin çıktısını ver.

Benim için geriye doğru çalışarak
hangi süreçlerin gerçekleşmiş olması gerektiğini göster.
```

Mühendislikte aşırı güçlü.

---

## 📈 Ölçek Analizi

**Amaç:** Sistem büyüyünce ne oluyor?

```text
Bu sistem:

- 10 kat küçülürse
- 100 kat büyürse

hangi davranışları değişir?
```

Kontrol, ağlar, elektronik, ekonomi gibi alanlarda çok faydalı.

---

## 🔗 Disiplinlerarası Bağlantılar

**Amaç:** Konuyu başka alanlarla ilişkilendirmek.

```text
Bu konunun:

- Matematikte
- Fizikte
- Biyolojide
- Ekonomide

karşılık gelen benzer prensiplerini göster.
```

---

## 🚨 Kırılma Noktaları

**Amaç:** Nerede işler bozuluyor?

```text
Bu sistemin en hassas noktaları nelerdir?

- Tek hata noktaları
- Kritik bağımlılıklar
- Kırılma senaryoları
```

---

## 🧠 Uzman Gibi Düşün

**Amaç:** Uzman zihniyetini görmek.

```text
Bu konuda uzman biri
acemilerin fark etmediği hangi şeyleri hemen fark eder?

5 örnek ver.
```

---

## 📚 Kaynak Haritası

**Amaç:** Sonraki adım.

```text
Bu konuyu öğrenmek için:

- Başlangıç seviyesi
- Orta seviye
- İleri seviye

kaynak türleri öner.
```

---

## 🎮 Simülasyon Modu

**Amaç:** Etkileşimli öğrenme.

```text
Bu sistemin içinde bir bileşenmişim gibi davran.

Bana adım adım ne yaşadığımı anlat.
```

Örneğin:

* Elektron olarak MOSFET içinde
* Veri paketi olarak TCP ağında
* Kan hücresi olarak dolaşım sisteminde

