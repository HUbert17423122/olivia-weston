/* ================= OLIVIA WESTON WEBSITE (JSX) =================
ASSETS BACKGROUNDS VERSION (no URL backgrounds / no admin background editor)

Put your images here (example):
src/assets/backgrounds/home.jpg
src/assets/backgrounds/yoga.jpg
src/assets/backgrounds/education.jpg
src/assets/backgrounds/wellness.jpg

Then this file imports them and uses them as page backdrops.
=============================================================== */

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= IMPORT LOCAL ASSET BACKGROUNDS ================= */
import bgHome from "./assets/backgrounds/home.jpg";
import bgYoga from "./assets/backgrounds/yoga.jpg";
import bgEducation from "./assets/backgrounds/education.jpg";
import bgWellness from "./assets/backgrounds/wellness.jpg";

/* ================= CONFIG ================= */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

/* ================= GLOBAL CARD LINE (use same grey everywhere) ================= */
const CARD_LINE = "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

/* ================= BUTTON ================= */
function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center text-[13px] sm:text-sm font-semibold transition rounded-full px-6 py-3 select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "outline"
      ? "border border-white/35 bg-white/10 text-inherit hover:bg-white/15 hover:border-white/45 focus:ring-white/30 focus:ring-offset-transparent"
      : variant === "ghost"
      ? "bg-transparent hover:bg-white/10 focus:ring-white/25 focus:ring-offset-transparent"
      : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_12px_30px_-18px_rgba(0,0,0,.55)] focus:ring-neutral-900/25 focus:ring-offset-white/0";
  return (
    <button className={cx(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

/* ================= I18N ================= */
const I18N = {
  pl: {
    wellnessCatalog: {
      title: "Wellness",
      subtitle: "Wybierz zabieg, poznaj szczegóły i umów termin",
      groups: [
        {
          title: "MASAŻE I TERAPIE CIAŁA",
          items: [
            {
              id: "swedish",
              name: "Swedish massage",
              desc:
                "Zanurz się w klasycznym rytmie głębokiego relaksu. Ten masaż, dzięki płynnym, długim pociągnięciom, rozpuści napięcie w każdym mięśniu, ukoi Twój umysł i przywróci wewnętrzną równowagę. Wyjdź z niego odprężony, lekki i pełen energii do życia.",
              duration: "45 minut",
            },
            {
              id: "integrated",
              name: "Integrated massage",
              desc:
                "To masaż stworzony specjalnie dla Ciebie. Łącząc najlepsze techniki, terapeuta idealnie dopasuje zabieg do Twoich potrzeb – czy to głęboki relaks, czy skupienie na konkretnych dolegliwościach. To holistyczna podróż ku pełni dobrostanu ciała i ducha.",
              duration: "45 minut",
            },
            {
              id: "lomi",
              name: "Lomi Lomi massage",
              desc:
                "Poczuj na skórze kojący rytm hawajskiej miłości. Długie, płynące jak fala ruchy rąk i przedramion terapeuty usuną napięcia i emocjonalne blokady. To więcej niż masaż – to duchowa podróż, która przywraca harmonię i pozostawia uczucie niezwykłej lekkości.",
              duration: "45 minut",
            },
            {
              id: "hotstones",
              name: "Hot stones massage",
              desc:
                "Odprężenie, które przenika do samego wnętrza mięśni. Ciepło gładkich, rozgrzanych kamieni głęboko rozluźnia, pozwalając na dotarcie do nawet chronicznego napięcia. Poczuj, jak stres dosłownie wyparowuje z Twojego ciała, pozostawiając błogi stan beztroski.",
              duration: "45 minut",
            },
            {
              id: "soundbath",
              name: "Sound bath massage",
              desc:
                "Zamknij oczy i daj się ponieść leczącej mocy dźwięku. Wibracje mis, gongów i dzwonków wprowadzą Twój umysł w stan głębokiej medytacji, rozpuszczają stres i przywracają wewnętrzny spokój. To oczyszczająca kąpiel dla Twojej energii, po której poczujesz się odnowiony.",
              duration: "45 minut",
            },
            {
              id: "headindian",
              name: "Head Indian massage with energy healing",
              desc:
                "Uwolnij umysł i zyskaj kryształową jasność myślenia. Ten dynamiczny masaż głowy, karku i ramion natychmiastowo uśmierza napięciowe bóle głowy. Połączony z uzdrawianiem energetycznym, uwalnia mentalne blokady, pozostawiając uczucie nieziemskiej lekkości i pogody ducha.",
              duration: "45 minut",
            },
            {
              id: "hopi",
              name: "Hopi Candles/Coning",
              desc:
                "Oczyść uszy i umysł w jednym, niezwykle relaksującym rytuale. Ciepło i delikatny szum herbacianej świecy Hopi łagodzą napięcie w zatokach, uszach i całym systemie nerwowym. To wyjątkowo kojący zabieg, który przynosi ukojenie i wyciszenie.",
              duration: "45 minut",
            },
            {
              id: "cupping",
              name: "Chinese fire cupping",
              desc:
                "Pozwól swojemu ciału na głęboką detoksykację i regenerację. Zabieg stawia na nogi, zwiększając krążenie, wypłukując toksyny i rozbijając sztywne, obolałe mięśnie. To odwieczna metoda, która przynosi natychmiastową ulgę w bólu pleców, karku i stawów.",
              duration: "45 minut",
            },
            {
              id: "leeches",
              name: "Leeches (Hirudotherapy)",
              desc:
                "Wykorzystaj mądrość natury dla zdrowia swoich stawów i krążenia. Substancje wydzielane przez pijawki działają jak naturalny, silnie przeciwzapalny i przeciwzakrzepowy \"biokoktajl\". Zabieg wspiera gojenie, redukuje obrzęki i przywraca komfort ruchowy.",
              duration: "45 minut",
            },
            {
              id: "acupuncture",
              name: "Acupuncture",
              desc:
                "Nasze protokoły celują bezpośrednio w źródło problemu: jeden trwale wycisza przewlekły ból, drugi rozbraja mechanizm uzależnienia. Działając na poziomie fizjologii i psychiki, dają realną szansę na odzyskanie kontroli i życia bez ograniczeń.",
              duration: "45 minut",
            },
          ],
        },

        {
          title: "ZABIEGI NA TWARZ",
          items: [
            {
              id: "skin",
              name: "Skin facial",
              desc:
                "Podstawowy rytuał piękna dla każdego typu cery. Głębokie oczyszczenie, peeling, ekstrakcja i odżywcza maska natychmiast przywracają skórze świeżość i blask. To must-have dla promiennej, zdrowo wyglądającej cery przez cały rok.",
              duration: "45 minut",
            },
            {
              id: "classic",
              name: "Classic facial",
              desc:
                "Podstawowy rytuał piękna dla każdego typu cery. Głębokie oczyszczenie, peeling, ekstrakcja i odżywcza maska natychmiast przywracają skórze świeżość i blask. To must-have dla promiennej, zdrowo wyglądającej cery przez cały rok.",
              duration: "45 minut",
            },
            {
              id: "hydrating",
              name: "Hydrating facial",
              desc:
                "Twoja skóra pragnie drinka? Ten zabieg to intensywna kuracja nawadniająca, która wlewa pod powierzchnię skóry potężną dawkę nawilżenia. Natychmiast redukuje uczucie ściągnięcia, wygładza zmarszczki i pozostawia cerę pulchną, miękką i pełną blasku.",
              duration: "45 minut",
            },
            {
              id: "sensitive",
              name: "Sensitive skin facial",
              desc:
                "Wreszcie poczujesz, co znaczy komfort! Ten ultra-łagodny zabieg, stworzony z myślą o delikatnej cerze, koi zaczerwienienia, wzmacnia barierę ochronną i przynosi ukojenie. Twoja skóra odzyska równowagę, spokój i zdrowy wygląd.",
              duration: "45 minut",
            },
            {
              id: "luxury",
              name: "Luxury facial",
              desc:
                "Zapraszamy na najwyższą klasę luksusu i skuteczności. To dłuższa, multisensoryczna podróż z elitarnymi kosmetykami, masażem i pielęgnacją strefy dekolt. Zanurz się w absolutnym relaksie i wyjdź z widocznie odmłodzoną, nieskazitelną cerą.",
              duration: "45 minut",
            },
            {
              id: "hydroderm",
              name: "Hydrodermabrasion",
              desc:
                "Odmładzanie bez inwazji! Strumień tlenu i nawilżających serum delikatnie złuszcza, jednocześnie intensywnie odżywiając skórę. Efekt? Natychmiastowy blask, wyrównany koloryt i gładkość, którą pokochasz. Zero dyskomfortu, zero przestoju.",
              duration: "45 minut",
            },
            {
              id: "led",
              name: "LED LIGHT facial",
              desc:
                "Twoja skóra zasługuje na światło młodości! Bezbolesna, niesamowicie relaksująca terapia światłem LED zwalcza niedoskonałości, stymuluje produkcję kolagenu i redukuje stany zapalne. To jak kojące słońce, które leczy i odmładza z każdą sesją.",
              duration: "45 minut",
            },
            {
              id: "microneedling",
              name: "MICRONEEDLING",
              desc:
                "Odkryj moc naturalnej regeneracji! Zabieg aktywuje wewnętrzne siły skóry do produkcji kolagenu, wygładzając blizny, zmarszczki i rozszerzone pory. Twoja cera stanie się gęstsza, gładsza i przygotowana na maksymalne wchłanianie kosmetyków.",
              duration: "45 minut",
            },
            {
              id: "dermaplaning",
              name: "Dermaplaning",
              desc:
                "Natychmiastowy efekt gładkości i olśniewającego blasku! Zabieg delikatnie usuwa meszek i martwy naskórek, odsłaniając jasną, jak jedwab gładką skórę. Makijaż będzie ложиł się idealnie, a Ty poczujesz się niesamowicie odświeżona.",
              duration: "45 minut",
            },
            {
              id: "chemicalpeel",
              name: "Chemical peel",
              desc:
                "Odśwież swoją cerę dosłownie jak skórkę! Peeling chemiczny dogłębnie złuszcza, redukując przebarwienia, zmarszczki i blizny. To skuteczny reset dla skóry, który ujawnia jej młodszą, świeższą i bardziej promienną wersję.",
              duration: "45 minut",
            },
            {
              id: "fatdissolve",
              name: "Fat dissolve (Injection Lipolysis)",
              desc:
                "Pożegnaj się z upartymi oponkami i podbródkiem! Ten niechirurgiczny zabieg precyzyjnie rozbija komórki tłuszczowe w wybranych miejscach, które oparły się diecie. Zyskaj wymarzone kontury ciała bez skalpela i długiej rekonwalescencji.",
              duration: "45 minut",
            },
            {
              id: "antiwrinkle",
              name: "Antiwrinkle (Injectable Neuromodulators e.g., Botox)",
              desc:
                "Zatrzymaj czas w locie i zachowaj naturalną mimikę. Zabieg delikatnie rozluźnia mięśnie odpowiedzialne za powstawanie zmarszczek mimicznych, wygładzając je i zapobiegając pogłębianiu. Szybko, dyskretnie, efektownie – ciesz się gładkim czołem na co dzień!",
              duration: "45 minut",
            },
          ],
        },
      ],
    },
    contact: {
      title: "Napisz do mnie",
      open: "Kontakt",
      close: "Zamknij",
      name: "Imię i nazwisko",
      email: "Email",
      message: "Wiadomość",
      send: "Wyślij",
      sending: "Wysyłanie…",
      sent: "Wiadomość wysłana. Dziękuję!",
      required: "Imię, email i wiadomość są wymagane.",
    },

    langToggleHint: "Język",
    navBrand: "OLIVIA WESTON",
    footerTagline: "Yoga · Edukacja · Wellness",
    footerCopyright: (y) => `© ${y} Olivia Weston`,
    darkToggleLight: "Jasny",
    darkToggleDark: "Ciemny",
    admin: "Admin",
    dashboard: "Panel",
    open: "Otwórz",
    back: "Wstecz",
    backToHome: "Powrót",
    backTo: (t) => `Powrót do ${t}`,
    book: "Umów sesję",
    bookGeneral: "Zapytanie ogólne",
    browseMore: "Zobacz więcej",
    bookingTitle: "Rezerwacja",
    bookingClose: "Zamknij",
    bookingSelectDay: "Wybierz dzień",
    bookingSelectTime: "Wybierz godzinę",
    bookingAvailable: "Dostępne",
    bookingDuration: "45 minut",
    bookingConfirm: "Wyślij",
    bookingSent: (d, s) => `Prośba wysłana: ${d}, ${s}.`,
    bookingProdNote:
      "Zgłoszenie zostało zapisane w systemie. W wersji produkcyjnej można dodać e-mail/CRM/powiadomienia.",
    formName: "Imię i nazwisko",
    formPhone: "Telefon",
    formEmail: "Email (opcjonalnie)",
    formRequiredErr: "Imię i telefon są wymagane.",
    homeHeroTitle: "Olivia Weston",
    homeHeroSubtitle:
      "Yoga, edukacja i wellness — z uważnością, spokojem i jasną strukturą. Wybierz ścieżkę i poznaj szczegóły bez informacyjnego chaosu.",
    homeHeroMeta: "Yoga · Edukacja · Wellness",
    homeQuoteBand:
      "Prosta struktura tworzy spokój — dzięki temu łatwiej wybrać to, co naprawdę Cię wspiera.",
    subProductsTitle: "Dostępne produkty",
    subProductsSub: "Wybrane propozycje dopasowane do tego obszaru.",
    noProducts: "Brak produktów dla tego obszaru.",
    productImageAlt: "Miejsce na zdjęcie produktu",
    view: "Zobacz",
    quote: {
      wellness_home:
        "„Zdrowie wymaga stanu równowagi między wpływami środowiska, sposobem życia oraz różnymi elementami ludzkiej natury.” — Hipokrates",
      education: "„Niechaj pożywienie będzie lekarstwem, a lekarstwo pożywieniem.” — Hipokrates",
      yoga_1: "To co zewnętrzne, zależy od wewnętrznego.",
      yoga_2: "Świadomy ruch jest najlepszym lekarstwem człowieka.",
      yoga_2_en: "“Conscious movement is our greatest remedy.”",
    },
    copy: {
      yogaIntro:
        "Witaj w przestrzeni, gdzie joga jest dialogiem duszy z ciałem. Jestem Olivia– moja wieloletnia praktyka to nie zawód, a powołanie serca. Towarzyszę dorosłym w odnajdywaniu wewnętrznej siły, dzieciom w budowaniu uważnej radości, a przyszłym matkom w świętym przygotowaniu do narodzin. Moją misją jest być przewodniczką na Twojej własnej ścieżce powrotu do ciszy, mocy i lekkości, które już w Tobie mieszkają. Zapraszam Cię do wspólnego oddychania, czucia i odkrywania.",
      educationIntro:
        "Wspólnie stworzymy bezpieczną przestrzeń, w której odzyskasz uważność i zaufanie do siebie. Pomogę Ci usłyszeć sygnały Twojego ciała, byś mógł/mogła wziąć pełną odpowiedzialność za swoje wybory i zbudować trwałe, dobre nawyki.",
      wellnessIntro:
        "Głęboko w Tobie jest pragnienie nie tylko tego, aby dobrze wyglądać — ale przede wszystkim, aby czuć lekkość, witalność i pełną harmonię ze sobą. Holistyczna troska o ciało i umysł to jedna z najpiękniejszych inwestycji w zdrowie: wspiera równowagę, regenerację i codzienne poczucie spokoju.",
      noSugarAdults:
        "Przedstawiam program edukacyjny „No Sugar” – „The Sugar Trap”, który bada wpływ cukru na organizm człowieka, a także na dobrostan fizyczny i psychiczny.\n\nTreść prezentacji opiera się na powszechnie dostępnych informacjach oraz zaleceniach żywieniowych upowszechnianych przez lekarzy, dietetyków i wiarygodne źródła medialne oraz literaturze przedmiotu. Program ma charakter wyłącznie informacyjno-edukacyjny i w żadnym wypadku nie stanowi porady lekarskiej, diagnostycznej ani terapeutycznej. W przypadku konkretnych problemów zdrowotnych należy zawsze skonsultować się z lekarzem lub wykwalifikowanym specjalistą.\n\nKompleksowy program koncentruje się na roli węglowodanów w diecie, ujawnia ilość cukru ukrytego w codziennym pożywieniu oraz uczy, jak praktycznie rozróżniać cukry proste i złożone, aby świadomie dokonywać lepszych wyborów żywieniowych.\n\nZapraszam do udziału w programie:\n\n· Dla Ciebie – grupa dla dorosłych\n· Dla Twojej organizacji – warsztaty dla firm lub grup.\n· Pakiet „Extra dla Rodziny” – obejmujący 5 sesji: pierwszą dla rodziców, a kolejne cztery tematyczne zajęcia edukacyjne dla dzieci, budujące zdrowe nawyki od najmłodszych lat.",
      noSugarKids:
        "Podczas naszej przygody odkryjemy, skąd czerpiemy energię do zabawy i nauki oraz co sprawia, że ją tracimy. Dowiemy się, co dzieje się w naszym ciele, dlaczego czasem czujemy się zmęczeni lub markotni, i jak być detektywem podczas wyboru posiłków. Moja specjalna prezentacja pokaże wam te wszystkie sekrety w zabawnej i prostej formie. Dzięki niej zostaniecie prawdziwymi tropicielami cukru – nauczycie się rozpoznawać, gdzie się on chowa w produktach, i jak wybierać mądrze, by być pełnym siły.",
      whatsUpBodyKids:
        "Przedstawiam dziecięcy program edukacyjny „What's Up Body?” – „Moje ciało wysyła wiadomości”.\n\nTreść tego programu została opracowana w oparciu o powszechnie dostępne, odpowiednie wiekowo materiały edukacyjne o ludzkim ciele i zdrowiu, zgodne z podstawami programowymi edukacji zdrowotnej w przedszkolach i szkołach podstawowych. Zawiera ogólną wiedzę promowaną przez pediatrów i wiarygodne organizacje zajmujące się zdrowiem dzieci.\n\nNależy wyraźnie podkreślić, że program ma wyłącznie charakter edukacyjny, profilaktyczny i zabawowy. Jego celem jest wyposażenie dzieci w podstawową wiedzę i słownictwo, a w żadnym wypadku nie stanowi porady medycznej, diagnozy ani rekomendacji terapeutycznej. Program nie zachęca do samodiagnozy ani leczenia. Jego głównym celem jest budowanie otwartej komunikacji między dziećmi a ich rodzicami lub opiekunami prawnymi. Wszelkie wątpliwości dotyczące zdrowia dziecka należy zawsze omawiać z wykwalifikowanym personelem medycznym, takim jak pediatra lub pielęgniarka.\n\nTen kompleksowy program ma na celu pielęgnowanie naturalnej ciekawości dzieci, ucząc je w angażujący i dostosowany do wieku sposób, jak rozpoznawać niezwykłe sygnały wysyłane przez ich ciała. Poprzez interaktywne warsztaty skupiamy się na:\n\n· Budowaniu świadomości ciała: Pomaganie dzieciom w identyfikacji i nazywaniu powszechnych odczuć cielesnych (np. „motylki w brzuszku”, „ból brzucha”, „gorąca głowa”, „zmęczone mięśnie”).\n· Tworzeniu mostu komunikacyjnego: Wyposażanie dzieci w zrozumienie znaczenia mówienia zaufanej osobie dorosłej – rodzicowi, opiekunowi lub nauczycielowi – kiedy czują się „inaczej niż zwykle”.\n· Podstawach profilaktyki: Wprowadzenie prostej idei, że zwracanie uwagi na to, jak się czujemy, jest pierwszym krokiem w dbaniu o siebie, zachęcając do rozwijania trwałego nawyku świadomości zdrowotnej.\n\nZapraszam do udziału w programie:\n\n· Dla Twojego dziecka/grupy: Angażujące warsztaty dla dzieci w grupach wiekowych.\n· Dla Twojej instytucji: Dostosowane sesje dla żłobków, szkół, świetlic i klubów dziecięcych.",
      whatsUpBodyAdults:
        "Przedstawiam program edukacyjny „What's Up Body” – „Objawy nie mają wieku”.\n\nTreść prezentacji została opracowana w oparciu o powszechnie dostępne i wiarygodne źródła, w tym informacje upowszechniane przez środowisko medyczne, publikacje z zakresu medycyny stylu życia oraz literaturę naukowo-popularyzacyjną. Należy podkreślić, że program ma charakter wyłącznie informacyjno-edukacyjny i nie zastępuje w żadnym zakresie konsultacji z lekarzem. Nie stanowi porady lekarskiej, diagnozy ani rekomendacji terapeutycznej. Wszelkie decyzje dotyczące zdrowia, leczenia lub zmiany trybu życia należy podejmować wyłącznie po konsultacji z odpowiednim lekarzem lub wykwalifikowanym specjalistą.\n\nCelem tego kompleksowego programu jest rozwój świadomości własnego ciała oraz umiejętności uważnego wsłuchiwania się w wysyłane przez nie sygnały. Skupia się on na kluczowej roli prewencji i profilaktyki zdrowotnej, której zadaniem jest wczesne rozpoznawanie niepokojących objawów, zrozumienie ich kontekstu oraz świadome podejmowanie działań sprzyjających zdrowiu, co może pomóc w uniknięciu poważniejszych konsekwencji w przyszłości.\n\nZapraszam do udziału w programie:\n\n· Dla Ciebie – grupa dla dorosłych.\n· Dla Twojej organizacji – np.: dla grup seniorów, klubów, stowarzyszeń lub innych zorganizowanych środowisk.",
      noUPFAdults:
        "Przedstawiam program edukacyjny „No UPF” – „Ultra-przetworzone żywności i ich wpływ na zdrowie”.\n\nProgram oparty jest na aktualnej wiedzy naukowej dotyczącej ultra-przetworzonych produktów żywnościowych (UPF). Zawiera informacje o ich składzie, potencjalnym wpływie na zdrowie metaboliczne i ogólne samopoczucie, zgodnie z publikacjami w renomowanych czasopismach medycznych i żywieniowych.\n\nNależy wyraźnie zaznaczyć, że program ma charakter wyłącznie edukacyjny i informacyjny. Nie stanowi porady dietetycznej, lekarskiej ani rekomendacji żywieniowej. Nie zachęca do eliminacji konkretnych produktów, lecz dąży do dostarczenia wiedzy umożliwiającej świadome wybory konsumenckie.\n\nCelem programu jest:\n· Zrozumienie, czym są ultra-przetworzone produkty żywnościowe (UPF).\n· Nauka czytania etykiet i identyfikowania UPF w codziennej diecie.\n· Poznanie potencjalnych konsekwencji zdrowotnych związanych z wysokim spożyciem UPF.\n· Wypracowanie praktycznych strategii na bardziej świadome i zrównoważone podejście do wyborów żywieniowych.\n\nZapraszam do udziału w programie:\n\n· Dla Ciebie – warsztaty dla dorosłych.\n· Dla Twojej firmy/zespołu – sesje edukacyjne w miejscu pracy.",
      toxFree:
        "Zapraszamy do programu „Tox Free” – kompleksowego spotkania o chemii w Twoim codziennym życiu.\n\nPrzedstawimy rzetelny przegląd dostępnej wiedzy na temat wpływu popularnych produktów, takich jak świece, odświeżacze powietrza czy detergenty, na Twoje zdrowie.\n\nDodatkowo, w sposób obiektywny poruszymy tematykę dymu tytoniowego oraz aerozolu z papierosów elektronicznych o tym jak oddziaływują na organizm.\n\nCelem programu jest dostarczenie Państwu skompensowanej, faktograficznej wiedzy, która umożliwi świadomą ocenę ryzyka.\n\nProgram ma wyłącznie charakter edukacyjny i informacyjny, nie służy diagnozowaniu, leczeniu ani promocji konkretnych produktów.\n\nZdobyta wiedza pozwoli Państwu podejmować bardziej przemyślane decyzje dla zdrowia swojego i swoich bliskich.\n\nZapraszam do udziału w programie:\n\n· Dla Ciebie – indywidualne sesje lub małe grupy.\n· Dla Twojej organizacji – warsztaty dla firm, instytucji lub społeczności.",
    },
    categories: {
      yoga: { title: "Yoga", subtitle: "Ruch terapeutyczny" },
      education: { title: "Edukacja", subtitle: "Świadome wybory" },
      wellness: { title: "Wellness", subtitle: "Holistyczna równowaga" },
    },
    subtopics: {
      yoga: {
        kids: {
          title: "Joga terapeutyczna dla dzieci",
          blurb:
            "Yoga Kids to więcej niż tylko ruch. To zajęcia, które rosną razem z Twoim dzieckiem. Dla najmłodszych są fascynującą zabawą pełną radości i kreatywności, która z czasem płynnie ewoluuje w profesjonalne wprowadzenie do świata jogi. Uczymy nie tylko gibkości, ale przede wszystkim koncentracji, radzenia sobie z emocjami i pewności siebie. To piękny sposób, by w atmosferze radości zadbać o zdrowy kręgosłup i wewnętrzny spokój Twojego dziecka.",
        },
        adults: {
          title: "Joga terapeutyczna dla dorosłych",
          blurb:
            "Odkryj moc klasycznej jogi z elementami jogi Nidry, jej uzdrawiający relaks balansujący w tobie energię Yin i Yang\n\nUwolnij napięcie\nOdnajdź równowagę\nNaucz się kochać siebie na nowo\n\n\"Joga to nie dotarcie na szczyt góry, ale wspinaczka która odkrywa przed nami piękno krajobrazu\"\n\nz miłością witam na macie Olivia",
        },
        seniors: {
          title: "Joga terapeutyczna dla seniorów",
          blurb:
            "Odpowiadając na Twoje potrzeby, stworzę jogę dla seniorów czerpiącą z klasycznej harmonii i głębokiej relaksacji Nidry. Będzie to praktyka łagodna i bezpieczna, z modyfikacjami dostosowanymi do indywidualnych możliwości. Każda sesja ma na celu stopniowe rozluźnianie ciała, wyciszenie natłoku myśli oraz przywrócenie wewnętrznej równowagi między energią a spokojem. Kluczowym elementem będzie głęboka jogiczna relaksacja, prowadząca do uwolnienia napięć i pokoju umysłu. Dzięki temu praktyka stanie się rytuałem troski o siebie, pomagającym na nowo odnaleźć wewnętrzny spokój i życzliwość dla własnego ciała.",
        },
      },
      education: {
        noSugarAdults: {
          title: "Bez cukru – dorośli",
          blurb:
            "Zrozum wpływ węglowodanów na energię, nastrój i zdrowie — i odzyskaj kontrolę dzięki praktycznej wiedzy.",
        },
        noSugarKids: {
          title: "Bez cukru – dzieci",
          blurb:
            "Zabawna i prosta edukacja: skąd mamy energię, dlaczego ją tracimy i jak zostać „detektywem cukru”.",
        },
        whatsUpBodyKids: {
          title: "What's Up Body – dzieci",
          blurb:
            "Program edukacyjny dla dzieci: „Moje ciało wysyła wiadomości”. Uczy rozpoznawać sygnały ciała i budować otwartą komunikację z dorosłymi.",
        },
        whatsUpBodyAdults: {
          title: "What's Up Body – dorośli",
          blurb:
            "Program edukacyjny: „Objawy nie mają wieku”. Rozwija świadomość ciała i umiejętność słuchania jego sygnałów w kontekście profilaktyki zdrowotnej.",
        },
        noUPFAdults: {
          title: "No UPF – dorośli",
          blurb:
            "Program o ultra-przetworzonej żywności (UPF). Nauka czytania etykiet, rozumienia składu i świadomego podejścia do wyborów żywieniowych.",
        },
        toxFree: {
          title: "Tox Free",
          blurb:
            "Program o chemii w codziennym życiu. Rzetelny przegląd wiedzy o wpływie popularnych produktów domowych na zdrowie.",
        },
      },
      wellness: {
        bodyMind: {
          title: "Ciało i umysł",
          blurb: "Narzędzia wspierające relaks, regenerację i równowagę układu nerwowego.",
        },
        release: {
          title: "Uwolnienie",
          blurb: "Produkty wspierające rozluźnienie napięć, stresu i przeciążenia emocjonalnego.",
        },
        beauty: {
          title: "Piękno",
          blurb: "Rytuały i produkty podkreślające naturalne piękno — prosto i bez nadmiaru.",
        },
      },
    },
    subBlocks: {
      educationDefault: [
        { title: "Bezpieczna przestrzeń", textKey: "educationIntro" },
        {
          title: "W praktyce",
          text: "Wspólnie porządkujemy wiedzę, nazywamy sygnały ciała i budujemy nawyki, które zostają na długo.",
        },
        {
          title: "Spokojne tempo",
          text: "Bez presji i bez poczucia winy — z uważnością, konsekwencją i szacunkiem do Twoich możliwości.",
        },
      ],
      noSugarAdults: [
        { title: "Bez cukru — dorośli", textKey: "noSugarAdults" },
        {
          title: "Cel spotkania",
          text: "Odzyskasz jasność i spokój w podejmowaniu decyzji żywieniowych — bez skrajności, za to z rozumieniem mechanizmów.",
        },
      ],
      noSugarKids: [
        { title: "Bez cukru — dzieci", textKey: "noSugarKids" },
        {
          title: "Efekt",
          text: "Dzieci uczą się rozpoznawać cukier w produktach i wybierać mądrze — w przyjazny, lekki sposób.",
        },
      ],
      whatsUpBodyKids: [
        { title: "What's Up Body – dzieci", textKey: "whatsUpBodyKids" },
        {
          title: "Cel programu",
          text: "Budowanie mostu komunikacyjnego między dzieckiem a dorosłym, nauka nazywania odczuć i rozwój zdrowych nawyków.",
        },
      ],
      whatsUpBodyAdults: [
        { title: "What's Up Body – dorośli", textKey: "whatsUpBodyAdults" },
        {
          title: "Korzyści",
          text: "Rozwój samoświadomości, wczesne rozpoznawanie sygnałów ciała i świadome działania profilaktyczne.",
        },
      ],
      noUPFAdults: [
        { title: "No UPF – dorośli", textKey: "noUPFAdults" },
        {
          title: "Praktyczne umiejętności",
          text: "Nauka czytania etykiet, identyfikacja ultra-przetworzonych produktów i świadome wybory żywieniowe.",
        },
      ],
      toxFree: [
        { title: "Tox Free", textKey: "toxFree" },
        {
          title: "Bezpieczna wiedza",
          text: "Faktograficzny przegląd informacji umożliwiający świadomą ocenę ryzyka związanego z produktami codziennego użytku.",
        },
      ],
      yoga: [
        { title: "Praktyka", textKey: "yogaIntro" },
        {
          title: "Intencja",
          text: "Oddychamy, czujemy, odkrywamy — wracamy do ciszy, mocy i lekkości, które już w Tobie są.",
        },
      ],
      wellness: [
        {
          title: "Równowaga",
          text: "Wellness to codzienna, łagodna troska o siebie — małe rytuały, które realnie wspierają układ nerwowy i regenerację.",
        },
        {
          title: "Prostota",
          text: "Wybieramy to, co działa i jest łatwe do utrzymania — bez nadmiaru, za to z konsekwencją i uważnością.",
        },
      ],
    },
    products: {
      p1: { title: "Olejek regenerujący do ciała", tone: "Głębokie ukojenie" },
      p2: { title: "Świeca aromaterapeutyczna", tone: "Uziemienie i ciepło" },
      p3: { title: "Sole do kąpieli z magnezem", tone: "Rozluźnienie mięśni" },
      p4: { title: "Roller do masażu", tone: "Ulga dla napięć" },
      p5: { title: "Gua sha do twarzy", tone: "Delikatny lifting" },
      p6: { title: "Serum nawilżające", tone: "Codzienny blask" },
    },
  },

  en: {
    wellnessCatalog: {
      title: "Wellness",
      subtitle: "Choose a treatment, explore details, and book",
      groups: [
        {
          title: "MASSAGES & BODY TREATMENTS",
          items: [
            {
              id: "swedish",
              name: "Swedish massage",
              desc:
                "Immerse yourself in the classic rhythm of deep relaxation. This massage uses long, flowing strokes to melt away muscle tension, calm your mind, and restore inner balance. Leave feeling completely unwound, lighter, and brimming with positive energy.",
              duration: "45 minutes",
            },
            {
              id: "integrated",
              name: "Integrated massage",
              desc:
                "A treatment crafted uniquely for you. By blending the best techniques, our therapist will perfectly tailor the session to your needs—whether for deep relaxation or focused relief. It's a holistic journey to complete physical and mental well-being.",
              duration: "45 minutes",
            },
            {
              id: "lomi",
              name: "Lomi Lomi massage",
              desc:
                "Feel the soothing rhythm of Hawaiian love on your skin. The long, flowing, wave-like movements of the therapist's hands and forearms release physical and emotional blockages. More than a massage, it's a spiritual journey that restores harmony and leaves you feeling incredibly light.",
              duration: "45 minutes",
            },
            {
              id: "hotstones",
              name: "Hot stones massage",
              desc:
                "Experience relaxation that penetrates to the very core of your muscles. The warmth of smooth, heated stones deeply loosens tissue, allowing us to ease even chronic tension. Feel your stress literally evaporate, leaving you in a state of blissful tranquility.",
              duration: "45 minutes",
            },
            {
              id: "soundbath",
              name: "Sound bath massage",
              desc:
                "Close your eyes and surrender to the healing power of sound. The vibrations of singing bowls, gongs, and chimes will guide your mind into a deep meditative state, dissolving stress and restoring inner peace. It's a cleansing bath for your energy, leaving you feeling renewed.",
              duration: "45 minutes",
            },
            {
              id: "headindian",
              name: "Head Indian massage with energy healing",
              desc:
                "Free your mind and gain crystal-clear mental clarity. This dynamic massage of the head, neck, and shoulders instantly soothes tension headaches. Combined with energy healing, it releases mental blocks, leaving you with a feeling of uplifting lightness and calm.",
              duration: "45 minutes",
            },
            {
              id: "hopi",
              name: "Hopi Candles/Coning",
              desc:
                "Cleanse your ears and calm your mind in one uniquely relaxing ritual. The warmth and gentle whisper of the Hopi herbal candle ease sinus pressure, ear tension, and soothe the nervous system. It's an exceptionally calming treatment that brings profound peace.",
              duration: "45 minutes",
            },
            {
              id: "cupping",
              name: "Chinese fire cupping",
              desc:
                "Allow your body a deep detox and renewal. This invigorating treatment boosts circulation, flushes out toxins, and releases tight, aching muscles. It's an ancient method that brings immediate relief for back, neck, and joint discomfort.",
              duration: "45 minutes",
            },
            {
              id: "leeches",
              name: "Leeches (Hirududotherapy)",
              desc:
                "Harness the wisdom of nature for your joint health and circulation. The substances released by the leeches act as a natural, potent anti-inflammatory and anticoagulant \"bio-cocktail.\" The treatment supports healing, reduces swelling, and restores comfortable movement.",
              duration: "45 minutes",
            },
            {
              id: "acupuncture",
              name: "Acupuncture",
              desc:
                "Our protocols target the problem at its source: one effectively silences chronic pain, the other dismantles the mechanism of addiction. By working on both the physiological and psychological levels, they offer a genuine chance to regain control and live without limitations.",
              duration: "45 minutes",
            },
          ],
        },

        {
          title: "FACE TREATMENTS",
          items: [
            {
              id: "skin",
              name: "Skin facial",
              desc:
                "The essential beauty ritual for every skin type. Deep cleansing, exfoliation, extractions, and a nourishing mask instantly restore your skin's freshness and radiance. It's a must-have for a healthy, glowing complexion all year round.",
              duration: "45 minutes",
            },
            {
              id: "classic",
              name: "Classic facial",
              desc:
                "The essential beauty ritual for every skin type. Deep cleansing, exfoliation, extractions, and a nourishing mask instantly restore your skin's freshness and radiance. It's a must-have for a healthy, glowing complexion all year round.",
              duration: "45 minutes",
            },
            {
              id: "hydrating",
              name: "Hydrating facial",
              desc:
                "Is your skin craving a drink? This treatment is an intensive hydration therapy that floods your skin with a powerhouse dose of moisture. It instantly reduces tightness, smoothes fine lines, and leaves your complexion plump, soft, and dewy.",
              duration: "45 minutes",
            },
            {
              id: "sensitive",
              name: "Sensitive skin facial",
              desc:
                "Finally, experience true comfort! This ultra-gentle treatment, designed for delicate skin, soothes redness, strengthens the protective barrier, and delivers profound relief. Your skin will regain its balance, calm, and a healthy appearance.",
              duration: "45 minutes",
            },
            {
              id: "luxury",
              name: "Luxury facial",
              desc:
                "We invite you to the pinnacle of luxury and efficacy. This extended, multi-sensory journey features elite cosmeceuticals, expert massage, and décolleté care. Immerse yourself in absolute relaxation and emerge with visibly rejuvenated, flawless skin.",
              duration: "45 minutes",
            },
            {
              id: "hydroderm",
              name: "Hydrodermabrasion",
              desc:
                "Rejuvenation without invasion! A stream of oxygen and hydrating serums gently exfoliates while intensely nourishing the skin. The result? Instant glow, even tone, and a smoothness you'll love. No discomfort, no downtime.",
              duration: "45 minutes",
            },
            {
              id: "led",
              name: "LED LIGHT facial",
              desc:
                "Your skin deserves the light of youth! This painless, incredibly relaxing LED light therapy fights imperfections, stimulates collagen production, and reduces inflammation. It's like a soothing sun that heals and rejuvenates with every session.",
              duration: "45 minutes",
            },
            {
              id: "microneedling",
              name: "MICRONEEDLING",
              desc:
                "Discover the power of your skin's natural regeneration! This treatment activates your skin's innate ability to produce collagen, smoothing scars, wrinkles, and enlarged pores. Your complexion will become denser, smoother, and primed to absorb skincare like never before.",
              duration: "45 minutes",
            },
            {
              id: "dermaplaning",
              name: "Dermaplaning",
              desc:
                "Instant smoothness and dazzling radiance! This treatment gently removes peach fuzz and dead skin cells, revealing bright, silky-smooth skin. Your makeup will glide on flawlessly, and you'll feel incredibly refreshed.",
              duration: "45 minutes",
            },
            {
              id: "chemicalpeel",
              name: "Chemical peel",
              desc:
                "Refresh your complexion, literally! A chemical peel deeply exfoliates, reducing pigmentation, wrinkles, and scars. It's an effective reset for your skin, revealing a younger, fresher, and more radiant version of itself.",
              duration: "45 minutes",
            },
            {
              id: "fatdissolve",
              name: "Fat dissolve (Injection Lipolysis)",
              desc:
                "Say goodbye to stubborn pockets of fat! This non-surgical treatment precisely breaks down fat cells in targeted areas that resist diet and exercise. Achieve your desired body contours without a scalpel or long recovery.",
              duration: "45 minutes",
            },
            {
              id: "antiwrinkle",
              name: "Antiwrinkle (Injectable Neuromodulators e.g., Botox)",
              desc:
                "Pause time while keeping your natural expressions. This treatment gently relaxes the muscles responsible for dynamic wrinkles, smoothing them and preventing further deepening. Quick, discreet, effective—enjoy a smooth forehead every day.",
              duration: "45 minutes",
            },
          ],
        },
      ],
    },
    contact: {
      title: "Contact me",
      open: "Contact",
      close: "Close",
      name: "Full name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending…",
      sent: "Message sent. Thank you!",
      required: "Name, email and message are required.",
    },

    langToggleHint: "Language",
    navBrand: "OLIVIA WESTON",
    footerTagline: "Yoga · Education · Wellness",
    footerCopyright: (y) => `© ${y} Olivia Weston`,
    darkToggleLight: "Light",
    darkToggleDark: "Dark",
    admin: "Admin",
    dashboard: "Dashboard",
    open: "Open",
    back: "Back",
    backToHome: "Back to home",
    backTo: (t) => `Back to ${t}`,
    book: "Book a session",
    bookGeneral: "General enquiry",
    browseMore: "Browse more",
    bookingTitle: "Book a session",
    bookingClose: "Close",
    bookingSelectDay: "Select a day",
    bookingSelectTime: "Select a time",
    bookingAvailable: "Available",
    bookingDuration: "45 minutes",
    bookingConfirm: "Send",
    bookingSent: (d, s) => `Request sent for ${d} at ${s}.`,
    bookingProdNote: "Request saved. In production, you can add email/CRM notifications.",
    formName: "Full name",
    formPhone: "Phone",
    formEmail: "Email (optional)",
    formRequiredErr: "Name and phone are required.",
    homeHeroTitle: "Olivia Weston",
    homeHeroSubtitle:
      "Yoga, education and wellness—delivered with calm clarity and thoughtful structure. Choose a path to explore services without information overload.",
    homeHeroMeta: "Yoga · Education · Wellness",
    homeQuoteBand: "Simple structure creates calm—so you can choose what supports you.",
    subProductsTitle: "Available products",
    subProductsSub: "Curated items aligned with this focus.",
    noProducts: "No products listed for this focus yet.",
    productImageAlt: "Product image placeholder",
    view: "View",
    quote: {
      wellness_home:
        "“Health requires a state of balance between environmental influences, lifestyle, and the various elements of human nature.” — Hippocrates",
      education: "“Let your food be your medicine, and let your medicine be your food.” — Hippocrates",
      yoga_1: "What is external depends on what is internal.",
      yoga_2: "“Conscious movement is our greatest remedy.”",
    },
    copy: {
      yogaIntro:
        "Welcome to a space where yoga is a dialogue between the soul and the body. I am Olivia– for me, yoga is not a profession, but a calling of the heart. I guide adults in rediscovering their inner strength, children in cultivating mindful joy, and expectant mothers in the sacred journey toward birth. My mission is to walk beside you on your path back to the stillness, power, and lightness that already reside within you. I invite you to breathe, feel, and discover together.",
      educationIntro:
        "Together, we will create a safe space where you will regain mindfulness and trust in yourself. I will help you hear the signals of your body, so that you can take full responsibility for your choices and build lasting, healthy habits.",
      wellnessIntro:
        "Deep down, you desire not only to look good — you yearn to feel light, vital, and in complete harmony with yourself. Professional, holistic treatments are a beautiful investment in your health: they support balance, recovery, and daily calm.",

      noSugarAdults:
        "The Sugar Trap\n\nI present the educational programme \"No Sugar\" – \"The Sugar Trap\", which investigates the impact of sugar on the human body, as well as on physical and mental wellbeing.\n\nThe presentation content is based on widely accessible information, nutritional guidelines promoted by doctors and dietitians, and credible media sources and scientific literature. The programme is strictly informational and educational in nature and does not, under any circumstances, constitute medical, diagnostic, or therapeutic advice. For any specific health concerns, always consult a physician or qualified specialist.\n\nThis comprehensive programme focuses on the role of carbohydrates in our diet, reveals the amount of hidden sugar in everyday foods, and provides practical knowledge on distinguishing between simple and complex sugars—empowering you to make conscious, healthier nutritional choices.\n\nI invite you to join the programme:\n\n· For You – an adult group session.\n· For Your Organisation – tailored workshops for companies or teams.\n· The \"Family Extra\" Package – includes 5 sessions: the first for parents, followed by four thematic educational workshops for children, designed to build healthy habits from an early age.",

      noSugarKids:
        "During our adventure, we will discover where we get the energy for play and learning, and what makes us lose it. We'll learn what happens in our bodies, why we sometimes feel tired or grumpy, and how to be a detective when choosing meals. My special presentation will show you all these secrets in a fun and simple way. Thanks to it, you will become real sugar detectives – you will learn to recognize where it hides in products and how to choose wisely to be full of energy.",

      whatsUpBodyKids:
        "Educational Programme: \"What's Up Body?\" - \"My Body Sends Messages\"\n\nI present the children's educational programme \"What's Up Body?\" - \"My Body Sends Messages\".\n\nThe content of this programme has been developed based on widely available, age-appropriate educational resources about the human body and health, aligned with early years and primary school health education frameworks. It incorporates general knowledge promoted by paediatricians and credible organisations dedicated to children's health.\n\nIt is crucial to clearly emphasise that this programme is strictly educational, preventive, and playful in nature. Its goal is to equip children with basic knowledge and vocabulary, and it does not, under any circumstances, constitute medical advice, diagnosis, or therapeutic recommendation. The programme does not encourage self-diagnosis or treatment. Its primary aim is to foster open communication between children and their parents or legal guardians. Any concerns regarding a child's health must always be discussed with qualified medical personnel, such as a paediatrician or nurse.\n\nThis comprehensive programme aims to nurture children's natural curiosity by teaching them, in an engaging and age-appropriate manner, to recognise the remarkable signals their bodies send. Through interactive workshops, we focus on:\n\n· Building Body Awareness: Helping children identify and name common bodily sensations (e.g., \"butterflies in the tummy,\" \"a sore tummy,\" \"a hot head,\" \"tired muscles\").\n· Creating a Communication Bridge: Empowering children with the understanding of the importance of telling a trusted adult—a parent, guardian, or teacher—when they feel \"different than usual.\"\n· Foundations of Prevention: Introducing the simple idea that paying attention to how our bodies feel is the first step in taking care of ourselves, encouraging the development of a lasting habit of health awareness.\n\nInvitation to the Programme:\n\n· For Your Child / Group: Engaging workshops for children in age-specific groups.\n· For Your Institution: Tailored sessions for nurseries, schools, after-school clubs, and children's clubs.",

      whatsUpBodyAdults:
        "I present the educational program \"What's Up Body\" – \"Symptoms Have No Age\".\n\nThe content of the presentation has been developed based on commonly available and credible sources, including information disseminated by the medical community, publications in the field of lifestyle medicine, and popular science literature. It must be emphasized that the program is strictly informational and educational in nature and does not in any way replace consultation with a doctor. It does not constitute medical advice, diagnosis, or a therapeutic recommendation. All decisions regarding health, treatment, or lifestyle changes should be made only after consultation with an appropriate doctor or qualified specialist.\n\nThe goal of this comprehensive program is to develop awareness of one's own body and the ability to attentively listen to the signals it sends. It focuses on the crucial role of health prevention and prophylaxis, the task of which is the early recognition of concerning symptoms, understanding their context, and consciously taking actions conducive to health. This can help avoid more serious consequences in the future.\n\nI invite you to participate in the program:\n\n· For You – a group for adults.\n· For Your Organization – e.g., for senior groups, clubs, associations, or other organized communities.",

      noUPFAdults:
        "I present the educational programme \"No UPF\" – \"Ultra-processed foods and their impact on health\".\n\nThe programme is based on current scientific knowledge regarding ultra-processed food products (UPF). It contains information about their composition, potential impact on metabolic health and overall well-being, in accordance with publications in reputable medical and nutritional journals.\n\nIt must be clearly stated that the programme is strictly educational and informational in nature. It does not constitute dietary advice, medical advice, or nutritional recommendations. It does not encourage the elimination of specific products, but aims to provide knowledge enabling conscious consumer choices.\n\nThe goals of the programme are:\n· Understanding what ultra-processed food products (UPF) are.\n· Learning to read labels and identify UPF in the daily diet.\n· Understanding the potential health consequences associated with high UPF consumption.\n· Developing practical strategies for a more conscious and balanced approach to food choices.\n\nI invite you to join the programme:\n\n· For You – workshops for adults.\n· For Your Company/Team – educational sessions in the workplace.",

      toxFree:
        "You are invited to the \"Tox Free\" program – a comprehensive meeting about chemistry in your daily life.\n\nWe will present a reliable overview of the available knowledge on how popular products, such as candles, air fresheners, and detergents, impact your health.\n\nAdditionally, we will objectively address the topics of tobacco smoke and aerosol from electronic cigarettes, discussing how they affect the body.\n\nThe goal of the program is to provide you with balanced, fact-based knowledge that enables a conscious assessment of risk.\n\nThe program is solely educational and informative in nature; it is not intended for diagnosis, treatment, or the promotion of specific products.\n\nThe knowledge gained will allow you to make more thoughtful decisions for the health of yourself and your loved ones.\n\nI invite you to participate in the programme:\n\n· For You – individual sessions or small groups.\n· For Your Organization – workshops for companies, institutions, or communities.",
    },
    categories: {
      yoga: { title: "Yoga", subtitle: "Therapeutic movement" },
      education: { title: "Education", subtitle: "Informed guidance" },
      wellness: { title: "Wellness", subtitle: "Holistic self-care" },
    },
    subtopics: {
      yoga: {
        kids: {
          title: "Yoga Kids",
          blurb:
            "Yoga Kids – More Than Just Movement. These classes grow with your child. For the youngest ones, it is a fascinating adventure full of joy and creativity, which seamlessly evolves into a professional introduction to the world of yoga. We teach not only flexibility but, above all, concentration, emotional balance, and self-confidence. It is a beautiful way to nurture your child's healthy spine and inner peace in an atmosphere of joy.",
        },
        adults: {
          title: "Yoga Adults",
          blurb:
            "Classic Yoga enriched with deep Nidra practice balancing Yin & Yang\n\nMelt away stress and tension\nQuiet your busy mind\nRediscover your inner balance\nFall in love with yourself again\n\nFind Your Inner Calm\nA warm welcome on the mat",
        },
        seniors: {
          title: "Yoga Seniors",
          blurb:
            "In response to your needs, I will create a seniors' yoga practice inspired by the harmony of classic yoga and deep Nidra relaxation. It will be gentle and safe, with modifications tailored to individual abilities. Each session is designed to gradually release tension, quiet the mind, and restore inner balance between energy and calm. A key element is deep yogic relaxation, helping you let go of stress and find peace of mind. This practice becomes a caring self-ritual—rediscovering calm, ease, and kindness toward your body.",
        },
      },
      education: {
        noSugarAdults: {
          title: "No Sugar - Adults",
          blurb: "Understand sugar's impact on energy, mood and health—and reduce it sustainably.",
        },
        noSugarKids: {
          title: "No Sugar - Kids",
          blurb: "Support healthier habits with calm guidance instead of restriction.",
        },
        whatsUpBodyKids: {
          title: "What's Up Body – Kids",
          blurb: "Educational program for children: 'My Body Sends Messages'. Teaches children to recognize body signals and build open communication with adults.",
        },
        whatsUpBodyAdults: {
          title: "What's Up Body – Adults",
          blurb: "Educational program: 'Symptoms Have No Age'. Develops body awareness and the ability to listen to its signals in the context of health prevention.",
        },
        noUPFAdults: {
          title: "No UPF – Adults",
          blurb: "Program about ultra-processed foods (UPF). Learn to read labels, understand composition and approach food choices consciously.",
        },
        toxFree: {
          title: "Tox Free",
          blurb: "Program about chemistry in daily life. Reliable overview of knowledge about the impact of common household products on health.",
        },
      },
      wellness: {
        bodyMind: {
          title: "Body & Mind",
          blurb: "Tools that support relaxation, recovery and nervous system balance.",
        },
        release: {
          title: "Release",
          blurb: "Products designed to ease tension, stress and stored emotional load.",
        },
        beauty: {
          title: "Beauty",
          blurb: "Rituals and products that enhance natural beauty without excess.",
        },
      },
    },
    subBlocks: {
      educationDefault: [
        { title: "Safe space", textKey: "educationIntro" },
        { title: "In practice", text: "We organize the information, name the body's signals, and build habits that last." },
        { title: "Sustainable pace", text: "No pressure and no guilt—just clarity, consistency and respect for your capacity." },
      ],
      noSugarAdults: [
        { title: "No sugar — adults", textKey: "noSugarAdults" },
        { title: "Outcome", text: "You gain calm clarity for food decisions—without extremes, with real understanding of the mechanisms." },
      ],
      noSugarKids: [
        { title: "No sugar — kids", textKey: "noSugarKids" },
        { title: "Outcome", text: "Kids learn how to spot hidden sugar and choose wisely—in a friendly, simple way." },
      ],
      whatsUpBodyKids: [
        { title: "What's Up Body — kids", textKey: "whatsUpBodyKids" },
        { title: "Program Goal", text: "Building a communication bridge between child and adult, learning to name feelings, and developing healthy habits." },
      ],
      whatsUpBodyAdults: [
        { title: "What's Up Body — adults", textKey: "whatsUpBodyAdults" },
        { title: "Benefits", text: "Developing self-awareness, early recognition of body signals, and conscious preventive actions." },
      ],
      noUPFAdults: [
        { title: "No UPF — adults", textKey: "noUPFAdults" },
        { title: "Practical Skills", text: "Learning to read labels, identifying ultra-processed products, and making conscious food choices." },
      ],
      toxFree: [
        { title: "Tox Free", textKey: "toxFree" },
        { title: "Safe Knowledge", text: "Fact-based overview of information enabling conscious risk assessment related to everyday products." },
      ],
      yoga: [
        { title: "Practice", textKey: "yogaIntro" },
        { title: "Intention", text: "Breathe, feel, discover—return to the stillness, power and lightness that already live within you." },
      ],
      wellness: [
        { title: "Balance", text: "Wellness is daily, gentle care—small rituals that genuinely support recovery and the nervous system." },
        { title: "Simplicity", text: "We choose what works and is easy to sustain—less excess, more consistency and awareness." },
      ],
    },
    products: {
      p1: { title: "Restorative Body Oil", tone: "Deeply calming" },
      p2: { title: "Aromatherapy Candle", tone: "Grounding warmth" },
      p3: { title: "Magnesium Bath Salts", tone: "Muscle release" },
      p4: { title: "Massage Roller", tone: "Tension relief" },
      p5: { title: "Facial Gua Sha", tone: "Gentle lift" },
      p6: { title: "Hydrating Serum", tone: "Daily glow" },
    },
  },
};

function getInitialLang() {
  const saved = typeof window !== "undefined" ? window.localStorage.getItem("ow_lang") : null;
  if (saved === "pl" || saved === "en") return saved;
  return "pl";
}

export const BACKGROUNDS = {
  home: bgHome,
  yoga: bgYoga,
  education: bgEducation,
  wellness: bgWellness,
};

/* ================= DATA BUILDERS ================= */
function buildCategories(t) {
  return [
    {
      key: "yoga",
      title: t.categories.yoga.title,
      subtitle: t.categories.yoga.subtitle,
      quote: t.quote.yoga_2,
      description: t.copy.yogaIntro,
      accent: "from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]",
      heroImage: BACKGROUNDS.yoga,
      children: [
        { key: "kids", title: t.subtopics.yoga.kids.title, blurb: t.subtopics.yoga.kids.blurb, route: "#/yoga/kids" },
        { key: "adults", title: t.subtopics.yoga.adults.title, blurb: t.subtopics.yoga.adults.blurb, route: "#/yoga/adults" },
        { key: "seniors", title: t.subtopics.yoga.seniors.title, blurb: t.subtopics.yoga.seniors.blurb, route: "#/yoga/seniors" },
      ],
    },
    {
      key: "education",
      title: t.categories.education.title,
      subtitle: t.categories.education.subtitle,
      quote: t.quote.education,
      description: t.copy.educationIntro,
      accent: "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]",
      heroImage: BACKGROUNDS.education,
      children: [
        { key: "no-sugar-adults", title: t.subtopics.education.noSugarAdults.title, blurb: t.subtopics.education.noSugarAdults.blurb, route: "#/education/no-sugar-adults" },
        { key: "no-sugar-kids", title: t.subtopics.education.noSugarKids.title, blurb: t.subtopics.education.noSugarKids.blurb, route: "#/education/no-sugar-kids" },
        { key: "whats-up-body-kids", title: t.subtopics.education.whatsUpBodyKids.title, blurb: t.subtopics.education.whatsUpBodyKids.blurb, route: "#/education/whats-up-body-kids" },
        { key: "whats-up-body-adults", title: t.subtopics.education.whatsUpBodyAdults.title, blurb: t.subtopics.education.whatsUpBodyAdults.blurb, route: "#/education/whats-up-body-adults" },
        { key: "no-upf-adults", title: t.subtopics.education.noUPFAdults.title, blurb: t.subtopics.education.noUPFAdults.blurb, route: "#/education/no-upf-adults" },
        { key: "tox-free", title: t.subtopics.education.toxFree.title, blurb: t.subtopics.education.toxFree.blurb, route: "#/education/tox-free" },
      ],
    },
    {
      key: "wellness",
      title: t.categories.wellness.title,
      subtitle: t.categories.wellness.subtitle,
      quote: t.quote.wellness_home,
      description: t.copy.wellnessIntro,
      accent: "from-[#c7b8a8] via-[#a48f7c] to-[#8a7461]",
      heroImage: BACKGROUNDS.wellness,
      children: [
        { key: "body-mind", title: t.subtopics.wellness.bodyMind.title, blurb: t.subtopics.wellness.bodyMind.blurb, route: "#/wellness/body-mind" },
        { key: "release", title: t.subtopics.wellness.release.title, blurb: t.subtopics.wellness.release.blurb, route: "#/wellness/release" },
        { key: "beauty", title: t.subtopics.wellness.beauty.title, blurb: t.subtopics.wellness.beauty.blurb, route: "#/wellness/beauty" },
      ],
    },
  ];
}

const WELLNESS_PRODUCTS_BASE = [
  { id: "p1", price: "£24", for: "body-mind" },
  { id: "p2", price: "£18", for: "body-mind" },
  { id: "p3", price: "£16", for: "release" },
  { id: "p4", price: "£20", for: "release" },
  { id: "p5", price: "£14", for: "beauty" },
  { id: "p6", price: "£28", for: "beauty" },
];

function buildProducts(t) {
  return WELLNESS_PRODUCTS_BASE.map((p) => ({ ...p, title: t.products[p.id].title, tone: t.products[p.id].tone }));
}

/* ================= HASH ROUTER ================= */
function useHashRoute() {
  const get = () => window.location.hash || "#/";
  const [hash, setHash] = useState(get());

  useEffect(() => {
    const onHash = () => setHash(get());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return hash;
}

function NavLink({ to, children, className }) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

/* ================= SHELL ================= */
function Shell({ dark, onToggleDark, lang, onToggleLang, t, children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  return (
    <div
      className={cx(
        "min-h-screen transition-colors duration-700 antialiased",
        dark ? "bg-[#0b0f0f] text-neutral-100" : "bg-[#f5f7f7] text-neutral-900"
      )}
      style={{
        fontFamily: 'var(--ow-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, Arial',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Manrope:wght@400;500;600;700&display=swap');
        :root{
          --ow-sans: "Manrope";
          --ow-display: "Fraunces";
        }
        ::selection{ background: rgba(255, 255, 255, 0.28); }
        a{ text-decoration: none; }
      `}</style>

      {/* ================= NAVBAR (LEFT/RIGHT, CLEAN, COMPACT) ================= */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 pt-3 sm:pt-5">
        <div className="flex items-center justify-between gap-3">
          {/* LEFT: Brand */}
          <NavLink
            to="#/"
            className={cx(
              "tracking-[0.16em] text-[11px] sm:text-xs uppercase transition",
              "opacity-90 hover:opacity-100",
              "whitespace-nowrap",
              dark ? "text-white" : "text-neutral-900"
            )}
            style={{ fontFamily: "var(--ow-sans)" }}
          >
            {t.navBrand}
          </NavLink>

          {/* RIGHT: Controls */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Language toggle (DESKTOP): compact segmented control */}
            <div
              className={cx(
                "hidden sm:inline-flex items-center rounded-full border overflow-hidden",
                dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
              )}
            >
              <button
                type="button"
                onClick={() => onToggleLang("pl")}
                aria-pressed={lang === "pl"}
                className={cx(
                  "px-3 py-2 text-[12px] font-semibold transition",
                  lang === "pl"
                    ? "bg-neutral-900 text-white"
                    : dark
                    ? "text-white/80 hover:bg-white/10"
                    : "text-neutral-900/80 hover:bg-black/5"
                )}
              >
                PL
              </button>
              <button
                type="button"
                onClick={() => onToggleLang("en")}
                aria-pressed={lang === "en"}
                className={cx(
                  "px-3 py-2 text-[12px] font-semibold transition",
                  lang === "en"
                    ? "bg-neutral-900 text-white"
                    : dark
                    ? "text-white/80 hover:bg-white/10"
                    : "text-neutral-900/80 hover:bg-black/5"
                )}
              >
                EN
              </button>
            </div>

            {/* Admin/Dashboard (slightly smaller on mobile) */}
            {token ? (
              <NavLink to="#/admin/dashboard" className="inline-flex">
                <Button
                  variant="outline"
                  className={cx(
                    "rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[12px] sm:text-sm",
                    dark ? "" : "border-black/10 bg-white"
                  )}
                >
                  {t.dashboard}
                </Button>
              </NavLink>
            ) : (
              <NavLink to="#/admin/login" className="inline-flex">
                <Button
                  variant="outline"
                  className={cx(
                    "rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[12px] sm:text-sm",
                    dark ? "" : "border-black/10 bg-white"
                  )}
                >
                  {t.admin}
                </Button>
              </NavLink>
            )}

            {/* Dark toggle (compact) */}
            <Button
              variant="ghost"
              onClick={onToggleDark}
              className={cx(
                "rounded-full px-3 sm:px-5 py-2.5 sm:py-3 text-[12px] sm:text-sm",
                dark ? "hover:bg-white/10" : "hover:bg-black/5"
              )}
            >
              {dark ? t.darkToggleLight : t.darkToggleDark}
            </Button>
          </div>
        </div>

        {/* MOBILE: PL/EN shown on its own row, compact + right-aligned */}
        <div className="sm:hidden mt-2 flex justify-end">
          <div
            className={cx(
              "inline-flex items-center rounded-full border overflow-hidden",
              dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
            )}
          >
            <button
              type="button"
              onClick={() => onToggleLang("pl")}
              aria-pressed={lang === "pl"}
              className={cx(
                "px-3 py-2 text-[12px] font-semibold transition",
                lang === "pl"
                  ? "bg-neutral-900 text-white"
                  : dark
                  ? "text-white/80 hover:bg-white/10"
                  : "text-neutral-900/80 hover:bg-black/5"
              )}
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => onToggleLang("en")}
              aria-pressed={lang === "en"}
              className={cx(
                "px-3 py-2 text-[12px] font-semibold transition",
                lang === "en"
                  ? "bg-neutral-900 text-white"
                  : dark
                  ? "text-white/80 hover:bg-white/10"
                  : "text-neutral-900/80 hover:bg-black/5"
              )}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {children}

      <footer className="max-w-7xl mx-auto px-6 sm:px-8 py-14 opacity-70 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="tracking-tight">{t.footerTagline}</p>
          <p className="tracking-tight">{t.footerCopyright(new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}

/* ================= HERO BACKDROP ================= */
function HeroBackdrop({
  bgImage,
  dark,
  accent,
  backdropHeightClass = "min-h-[1020px]",
  style,
  children,
}) {
  return (
    <div
      className={cx("relative overflow-hidden", backdropHeightClass)}
      style={{
        ...(bgImage
          ? {
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
          : {}),
        ...(style || {}),
      }}
    >
      <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${accent}`} />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.075] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />

      <div className={dark ? "absolute inset-0 bg-black/45" : "absolute inset-0 bg-white/25"} />
      <div
        className={
          dark
            ? "absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent"
            : "absolute inset-0 bg-gradient-to-r from-white/85 via-white/20 to-transparent"
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.22),transparent_60%)]" />

      <div className="relative z-10">{children}</div>

      <div
        className={
          dark
            ? "pointer-events-none absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-[#0b0f0f]/60 to-[#0b0f0f]"
            : "pointer-events-none absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-[#f5f7f7]/70 to-[#f5f7f7]"
        }
      />
    </div>
  );
}

/* ================= HERO / GRIDS ================= */
function Hero({ title, subtitle, primary, secondary, padClass = "py-20" }) {
  return (
    <section className="relative overflow-hidden min-h-[420px] md:min-h-[40px]">
      <div className={cx("relative z-10 max-w-7xl mx-auto px-6 sm:px-8", padClass)}>

        <div className="max-w-3xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="mb-7 leading-[0.96]"
            style={{
              fontFamily: "var(--ow-display)",
              letterSpacing: "-0.03em",
              fontWeight: 650,
              fontSize: "clamp(44px, 5.4vw, 74px)",
              marginTop: "20px",
            }}
          >
            {title}
          </motion.h1>

          <p className="text-[15px] md:text-[17px] opacity-85 leading-relaxed mb-10 tracking-[-0.01em]">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoGrid({ items, dark, t }) {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10 items-stretch">
        {items.map((it) => (
          <motion.div
            key={it.to}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="h-full"
          >
            <NavLink to={it.to} className="block h-full">
              <div
                className={cx(
                  "h-full rounded-[2rem] overflow-hidden flex flex-col border shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)]",
                  dark ? "bg-white/[0.06] backdrop-blur border-white/10" : "bg-white/0 backdrop-blur border-black/10"
                )}
              >
                <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

                <div className="p-9 md:p-10 flex flex-col h-full">
                  <div className="flex-1">
                    <h3
                      className="mb-3 leading-tight"
                      style={{
                        fontFamily: "var(--ow-display)",
                        letterSpacing: "-0.02em",
                        fontWeight: 650,
                        fontSize: "22px",
                      }}
                    >
                      {it.title}
                    </h3>

                    {it.meta ? <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">{it.meta}</p> : null}

                    {it.quote ? <p className="text-[13.5px] italic opacity-80 leading-relaxed mb-4">{it.quote}</p> : null}

                    <p className="text-[13.5px] opacity-85 leading-relaxed tracking-[-0.01em]">{it.desc}</p>
                  </div>

                  <div className="mt-10 inline-flex items-center gap-2 text-sm opacity-85">
                    <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                    <span>{t.open}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function QuoteBand({ quote }) {
  return (
    <section className="py-10 md:py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(142,151,166,0.16),transparent_60%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="leading-snug"
          style={{
            fontFamily: "var(--ow-display)",
            letterSpacing: "-0.02em",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.6vw, 34px)",
          }}
        >
          {quote}
        </motion.p>
      </div>
    </section>
  );
}

/* ================= BOOKING MODAL ================= */
function nextDays(count) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const nd = new Date(d);
    nd.setDate(d.getDate() + i);
    out.push(nd);
  }
  return out;
}

function formatDateLabel(d) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function formatDateISO(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function BookingModal({ open, onClose, contextTitle, t }) {
  const dates = useMemo(() => nextDays(14), []);
  const slots = useMemo(() => ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"], []);

  const [bookingEnabled, setBookingEnabled] = useState(true);

  const [takenSlots, setTakenSlots] = useState([]);
  const [pickedDate, setPickedDate] = useState(dates[2] || null);
  const [pickedSlot, setPickedSlot] = useState(slots[1] || null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [confirmed, setConfirmed] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sendingLabel = t.langToggleHint === "Język" ? "Wysyłanie…" : "Sending…";

  useEffect(() => {
    if (!open) return;
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/settings/booking`);
        const data = await res.json();
        if (!res.ok) throw new Error();
        if (alive) setBookingEnabled(!!data.enabled);
      } catch {
        if (alive) setBookingEnabled(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTakenSlots([]);
      setConfirmed(false);
      setSubmitErr("");
      setSubmitting(false);
      setName("");
      setPhone("");
      setEmail("");
      setPickedDate(dates[2] || null);
      setPickedSlot(slots[1] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open || !pickedDate) return;

    let alive = true;

    (async () => {
      try {
        const qs = new URLSearchParams({
          date: formatDateISO(pickedDate),
          context: contextTitle || "",
        });

        const res = await fetch(`${API_BASE}/appointments/availability?${qs.toString()}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to load availability");

        if (!alive) return;

        const taken = Array.isArray(data.taken) ? data.taken : [];
        setTakenSlots(taken);

        if (pickedSlot && taken.includes(pickedSlot)) {
          const firstFree = slots.find((s) => !taken.includes(s)) || null;
          setPickedSlot(firstFree);
        }
      } catch {
        if (alive) setTakenSlots([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, pickedDate, contextTitle]); // (slots + pickedSlot intentionally omitted)

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cx(
          // ✅ MOBILE: full-width bottom sheet that never exceeds viewport
          "relative w-full sm:w-[min(920px,92vw)]",
          "max-h-[92dvh] sm:max-h-none",
          "bg-white shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)] overflow-hidden",
          // ✅ MOBILE: rounded top only (sheet). Desktop: fully rounded.
          "rounded-t-[2rem] sm:rounded-[2rem]"
        )}
        style={{
          // helps iOS safe area feel nicer (optional but great)
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* sticky header (so close button always visible on mobile) */}
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
          <div className="px-5 sm:px-8 py-5 sm:py-8 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
                className="text-[20px] sm:text-2xl leading-tight"
              >
                {t.bookingTitle}
              </h3>
              <p className="text-sm opacity-70 mt-1 truncate">{contextTitle}</p>
            </div>

            <Button variant="ghost" onClick={onClose} className="hover:bg-black/5">
              {t.bookingClose}
            </Button>
          </div>
        </div>

        {/* ✅ scrollable content area (prevents “going out of screen”) */}
        <div className="overflow-y-auto max-h-[calc(92dvh-88px)] sm:max-h-none">
          <div className="px-5 sm:px-8 py-5 sm:py-8 grid gap-7 sm:gap-8 sm:grid-cols-2">
            {/* LEFT: DAY */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">{t.bookingSelectDay}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dates.map((d) => {
                  const active = pickedDate && pickedDate.getTime() === d.getTime();
                  return (
                    <button
                      key={d.toISOString()}
                      disabled={!bookingEnabled}
                      onClick={() => bookingEnabled && setPickedDate(d)}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-left transition",
                        !bookingEnabled ? "opacity-40 cursor-not-allowed" : "",
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      )}
                    >
                      <div className="text-sm font-semibold">{formatDateLabel(d)}</div>
                      <div className="text-xs opacity-70">{t.bookingAvailable}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: TIME + FORM */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">{t.bookingSelectTime}</p>

              <div className="grid grid-cols-2 gap-3">
                {slots.map((s) => {
                  const isTaken = takenSlots.includes(s);
                  const active = pickedSlot === s;

                  return (
                    <button
                      key={s}
                      disabled={isTaken || !bookingEnabled}
                      onClick={() => {
                        if (isTaken || !bookingEnabled) return;
                        setPickedSlot(s);
                      }}
                      className={cx(
                        "rounded-2xl border px-4 py-3 text-left transition",
                        !bookingEnabled ? "opacity-40 cursor-not-allowed" : "",
                        isTaken
                          ? "border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed"
                          : active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white hover:border-neutral-400"
                      )}
                    >
                      <div className="text-sm font-semibold">{s}</div>
                      <div className="text-xs opacity-70">
                        {isTaken ? (t.langToggleHint === "Język" ? "Zajęte" : "Booked") : t.bookingDuration}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3">
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formPhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="rounded-2xl border border-neutral-200 px-4 py-3"
                  placeholder={t.formEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {submitErr ? <p className="text-sm text-red-600">{submitErr}</p> : null}
              </div>

              {!bookingEnabled ? (
                <div className="rounded-2xl border border-neutral-200 p-4 mt-4 bg-neutral-50">
                  <p className="text-sm font-semibold">
                    {t.langToggleHint === "Język" ? "Rezerwacje są chwilowo wyłączone." : "Bookings are temporarily closed."}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {t.langToggleHint === "Język"
                      ? "Spróbuj ponownie później lub skontaktuj się bezpośrednio."
                      : "Please try again later or contact us directly."}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 pb-6 sm:pb-0">
                {!confirmed ? (
                  <Button
                    className="rounded-full px-9 w-full sm:w-auto"
                    disabled={submitting || !pickedDate || !pickedSlot || !bookingEnabled}
                    onClick={async () => {
                      if (!pickedDate || !pickedSlot) return;

                      if (!name.trim() || !phone.trim()) {
                        setSubmitErr(t.formRequiredErr);
                        return;
                      }

                      setSubmitting(true);
                      setSubmitErr("");

                      try {
                        const res = await fetch(`${API_BASE}/appointments`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: name.trim(),
                            phone: phone.trim(),
                            email: email.trim() || null,
                            date: formatDateISO(pickedDate),
                            time: pickedSlot,
                            context: contextTitle || null,
                          }),
                        });

                        const data = await res.json();

                        if (res.status === 409) {
                          setSubmitErr(t.langToggleHint === "Język" ? "Ten termin jest już zajęty." : "This slot is already booked.");

                          const qs = new URLSearchParams({
                            date: formatDateISO(pickedDate),
                            context: contextTitle || "",
                          });
                          const r2 = await fetch(`${API_BASE}/appointments/availability?${qs.toString()}`);
                          const d2 = await r2.json();
                          const taken = Array.isArray(d2.taken) ? d2.taken : [];
                          setTakenSlots(taken);
                          const firstFree = slots.find((s) => !taken.includes(s)) || null;
                          setPickedSlot(firstFree);
                          return;
                        }

                        if (!res.ok) throw new Error(data?.error || "Failed to submit");

                        setConfirmed(true);
                      } catch (e) {
                        setSubmitErr(e.message || "Failed to submit");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {submitting ? sendingLabel : t.bookingConfirm}
                  </Button>
                ) : (
                  <div className="rounded-2xl border border-neutral-200 p-4">
                    <p className="text-sm">
                      {t.bookingSent(pickedDate ? formatDateLabel(pickedDate) : "", pickedSlot || "")}
                    </p>
                    <p className="text-xs opacity-70 mt-1">{t.bookingProdNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= CONTACT POPUP (Education) ================= */
function ContactPopup({ open, onOpen, onClose, dark, t }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setMessage("");
      setErr("");
      setSending(false);
      setSent(false);
    }
  }, [open]);

  return (
    <>
      {/* floating button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!open ? (
          <Button
            className="rounded-full px-6 py-4 shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)]"
            onClick={onOpen}
          >
            {t.contact.open}
          </Button>
        ) : null}
      </div>

      {/* modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/45" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cx(
              "relative w-[min(560px,92vw)] rounded-[2rem] overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)]",
              dark ? "bg-[#0f1414] text-white" : "bg-white text-neutral-900"
            )}
          >
            <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

            <div className={cx("p-7 border-b", dark ? "border-white/10" : "border-black/10")}>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3
                    style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
                    className="text-2xl"
                  >
                    {t.contact.title}
                  </h3>
                  <p className="text-sm opacity-70 mt-1">Education</p>
                </div>

                <Button variant="ghost" onClick={onClose} className={dark ? "hover:bg-white/10" : "hover:bg-black/5"}>
                  {t.contact.close}
                </Button>
              </div>
            </div>

            <div className="p-7 grid gap-3">
              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <textarea
                className={cx(
                  "rounded-2xl px-4 py-3 border outline-none min-h-[130px] resize-none",
                  dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
                )}
                placeholder={t.contact.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {err ? <p className={cx("text-sm", dark ? "text-red-300" : "text-red-600")}>{err}</p> : null}

              {!sent ? (
                <Button
                  className="rounded-full px-10 py-4 mt-2"
                  disabled={sending}
                  onClick={async () => {
                    setErr("");
                    if (!name.trim() || !email.trim() || !message.trim()) {
                      setErr(t.contact.required);
                      return;
                    }

                    setSending(true);
                    try {
                      const res = await fetch(`${API_BASE}/messages`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: name.trim(),
                          email: email.trim(),
                          message: message.trim(),
                        }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data?.error || "Failed to send");
                      setSent(true);
                    } catch (e) {
                      setErr(e.message || "Failed to send");
                    } finally {
                      setSending(false);
                    }
                  }}
                >
                  {sending ? t.contact.sending : t.contact.send}
                </Button>
              ) : (
                <div className={cx("rounded-2xl border p-4 mt-2", dark ? "border-white/10" : "border-black/10")}>
                  <p className="text-sm">{t.contact.sent}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}

/* ================= ADMIN ================= */
function AdminLoginPage({ dark, onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
      <div
        className={cx(
          "max-w-lg rounded-[2rem] border p-10 overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full rounded-full mb-8 bg-gradient-to-r", CARD_LINE)} />
        <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-3xl mb-2">
          Admin Login
        </h1>
        <p className="text-sm opacity-75 mb-8">Sign in to manage bookings.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Email</label>
            <input
              className={cx(
                "mt-2 w-full rounded-2xl px-4 py-3 border outline-none",
                dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Password</label>
            <input
              className={cx(
                "mt-2 w-full rounded-2xl px-4 py-3 border outline-none",
                dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </div>

          {err ? <p className="text-sm text-red-400">{err}</p> : null}

          <Button
            className="rounded-full px-10 py-4"
            onClick={async () => {
              setErr("");
              setLoading(true);
              try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error || "Login failed");
                localStorage.setItem("ow_admin_token", data.token);
                onAuthed();
              } catch (e) {
                setErr(e.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <div className="pt-3">
            <a href="#/" className={cx("text-sm underline underline-offset-4 opacity-70 hover:opacity-100", dark ? "text-white" : "text-neutral-900")}>
              Back to site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ open, title, message, onClose, dark }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cx(
          "w-[min(420px,92vw)] rounded-[1.25rem] border shadow-[0_26px_70px_-40px_rgba(0,0,0,.65)] overflow-hidden",
          dark ? "bg-[#0f1414] border-white/10 text-white" : "bg-white border-black/10 text-neutral-900"
        )}
      >
        {/* top accent line */}
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

        <div className="p-5 flex gap-4 items-start">
          {/* icon */}
          <div
            className={cx(
              "mt-0.5 h-10 w-10 rounded-2xl flex items-center justify-center border",
              dark ? "bg-white/[0.06] border-white/10" : "bg-black/[0.03] border-black/10"
            )}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <div
              style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
              className="text-[16px] leading-tight"
            >
              {title}
            </div>
            <div className="text-[13px] opacity-80 mt-1 leading-relaxed whitespace-pre-wrap">
              {message}
            </div>
          </div>

          <button
            onClick={onClose}
            className={cx(
              "shrink-0 rounded-full px-3 py-2 text-xs font-semibold border transition",
              dark
                ? "border-white/10 hover:bg-white/10"
                : "border-black/10 hover:bg-black/5"
            )}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AdminDashboardPage({ dark, t }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);

  const [toast, setToast] = useState({ open: false, title: "", message: "" });

  const showToast = (title, message) => {
    setToast({ open: true, title, message });
  };

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const [msgErr, setMsgErr] = useState("");
  const [msgLoading, setMsgLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [bookingBusy, setBookingBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/settings/booking`);
        const data = await res.json();
        if (!res.ok) throw new Error();
        if (alive) setBookingEnabled(!!data.enabled);
      } catch {}
    })();
    return () => (alive = false);
  }, []);

  // Load appointments
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load appointments");
        if (alive) setItems(data.items || []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load appointments");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  // Load messages
  useEffect(() => {
    let alive = true;
    (async () => {
      setMsgLoading(true);
      setMsgErr("");
      try {
        const resM = await fetch(`${API_BASE}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataM = await resM.json();
        if (!resM.ok) throw new Error(dataM?.error || "Failed to load messages");
        if (alive) setMessages(dataM.items || []);
      } catch (e) {
        if (alive) setMsgErr(e.message || "Failed to load messages");
      } finally {
        if (alive) setMsgLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  const toggleBooking = async () => {
    try {
      setBookingBusy(true);
      const next = !bookingEnabled;

      const res = await fetch(`${API_BASE}/settings/booking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enabled: next }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update");

      setBookingEnabled(!!data.enabled);

      showToast(
        t.langToggleHint === "Język" ? "Zapisano" : "Saved",
        next
          ? (t.langToggleHint === "Język" ? "Rezerwacje włączone." : "Bookings enabled.")
          : (t.langToggleHint === "Język" ? "Rezerwacje wyłączone." : "Bookings disabled.")
      );
    } catch (e) {
      showToast(t.langToggleHint === "Język" ? "Błąd" : "Error", e.message || "Failed");
    } finally {
      setBookingBusy(false);
    }
  };

  const deleteAppt = async (id) => {
    const sure = window.confirm(t.langToggleHint === "Język" ? "Usunąć rezerwację?" : "Delete this appointment?");
    if (!sure) return;

    try {
      const res = await fetch(`${API_BASE}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  const deleteMessage = async (id) => {
    const sure = window.confirm(t.langToggleHint === "Język" ? "Usunąć wiadomość?" : "Delete this message?");
    if (!sure) return;

    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setMessages((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
      <AnimatePresence>
        <Toast
          open={toast.open}
          title={toast.title}
          message={toast.message}
          onClose={closeToast}
          dark={dark}
        />
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1
            style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
            className="text-3xl"
          >
            {t.dashboard}
          </h1>
          <p className="text-sm opacity-75">Manage booking requests.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
            onClick={() => (window.location.hash = "#/")}
          >
            Back to site
          </Button>
          <Button
            variant="outline"
            className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
            onClick={toggleBooking}
            disabled={bookingBusy}
          >
            {bookingBusy
              ? (t.langToggleHint === "Język" ? "Zapisywanie..." : "Saving...")
              : bookingEnabled
              ? (t.langToggleHint === "Język" ? "Wyłącz rezerwacje" : "Disable bookings")
              : (t.langToggleHint === "Język" ? "Włącz rezerwacje" : "Enable bookings")}
          </Button>

          <Button
            variant="outline"
            className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
            onClick={() => {
              localStorage.removeItem("ow_admin_token");
              window.location.hash = "#/admin/login";
            }}
          >
            Log out
          </Button>
        </div>
      </div>

      {/* ================= APPOINTMENTS ================= */}
      <div
        className={cx(
          "rounded-[2rem] border overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

        {loading ? (
          <div className="p-8 opacity-80">Loading…</div>
        ) : err ? (
          <div className="p-8 text-red-400">{err}</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className={cx(dark ? "bg-white/[0.04]" : "bg-black/[0.03]")}>
                <tr className="text-left">
                  <th className="p-4">Created</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Context</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className={cx("border-t", dark ? "border-white/10" : "border-black/10")}>
                    <td className="p-4 whitespace-nowrap opacity-80">
                      {it.created_at ? new Date(it.created_at).toLocaleString() : "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">{it.name}</td>
                    <td className="p-4 whitespace-nowrap">{it.phone}</td>
                    <td className="p-4 whitespace-nowrap opacity-80">{it.email || "-"}</td>
                    <td className="p-4 whitespace-nowrap">{it.date}</td>
                    <td className="p-4 whitespace-nowrap">{it.time}</td>
                    <td className="p-4 whitespace-nowrap opacity-80">{it.context || "-"}</td>
                    <td className="p-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                        onClick={() => deleteAppt(it.id)}
                      >
                        {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 ? (
                  <tr>
                    <td className="p-8 opacity-70" colSpan={8}>
                      No booking requests yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="mt-10" />

      <div
        className={cx(
          "rounded-[2rem] border overflow-hidden",
          dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
        )}
      >
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

        <div className="p-6">
          <h2
            style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }}
            className="text-2xl"
          >
            {t.langToggleHint === "Język" ? "Wiadomości" : "Messages"}
          </h2>
          <p className="text-sm opacity-75 mt-1">
            {t.langToggleHint === "Język" ? "Wiadomości z formularza kontaktowego." : "Messages from the contact form."}
          </p>
        </div>

        {msgLoading ? (
          <div className="p-8 opacity-80">Loading…</div>
        ) : msgErr ? (
          <div className="p-8 text-red-400">{msgErr}</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className={cx(dark ? "bg-white/[0.04]" : "bg-black/[0.03]")}>
                <tr className="text-left">
                  <th className="p-4">Created</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className={cx("border-t", dark ? "border-white/10" : "border-black/10")}>
                    <td className="p-4 whitespace-nowrap opacity-80">
                      {m.created_at ? new Date(m.created_at).toLocaleString() : "-"}
                    </td>
                    <td className="p-4 whitespace-nowrap">{m.name}</td>
                    <td className="p-4 whitespace-nowrap opacity-80">{m.email}</td>
                    <td className="p-4 w-[520px] max-w-[520px]">
                      <div className="opacity-85 whitespace-pre-wrap break-words">
                        {m.message}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                          onClick={() => {
                            setReplyingTo(m);
                            setReplyText("");
                          }}
                        >
                          {t.langToggleHint === "Język" ? "Odpowiedz" : "Reply"}
                        </Button>

                        <Button
                          variant="outline"
                          className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                          onClick={() => deleteMessage(m.id)}
                        >
                          {t.langToggleHint === "Język" ? "Usuń" : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {messages.length === 0 ? (
                  <tr>
                    <td className="p-8 opacity-70" colSpan={5}>
                      {t.langToggleHint === "Język" ? "Brak wiadomości." : "No messages yet."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= REPLY MODAL (INSERTED HERE) ================= */}
      {replyingTo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/45" onClick={() => setReplyingTo(null)} />

          <div
            className={cx(
              "relative w-[min(620px,92vw)] rounded-[2rem] p-6 border",
              dark ? "bg-[#0f1414] border-white/10 text-white" : "bg-white border-black/10 text-neutral-900"
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
                  {t.langToggleHint === "Język" ? "Odpowiedź" : "Reply"}
                </h3>
                <p className="text-sm opacity-75 mt-1">
                  {replyingTo.name} — {replyingTo.email}
                </p>
              </div>

              <Button variant="ghost" onClick={() => setReplyingTo(null)} className={dark ? "hover:bg-white/10" : "hover:bg-black/5"}>
                {t.langToggleHint === "Język" ? "Zamknij" : "Close"}
              </Button>
            </div>

            <textarea
              className={cx(
                "w-full rounded-2xl px-4 py-3 border outline-none min-h-[160px] resize-none",
                dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10"
              )}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t.langToggleHint === "Język" ? "Napisz odpowiedź..." : "Write your reply..."}
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                className={cx("rounded-full", dark ? "" : "border-black/10 bg-white")}
                onClick={() => setReplyingTo(null)}
                disabled={replySending}
              >
                {t.langToggleHint === "Język" ? "Anuluj" : "Cancel"}
              </Button>

              <Button
                className="rounded-full"
                disabled={replySending || !replyText.trim()}
                onClick={async () => {
                  try {
                    setReplySending(true);

                    const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

                    const res = await fetch(`${API_BASE}/messages/${replyingTo.id}/reply`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ reply: replyText }),
                    });

                    const data = await res.json().catch(() => ({}));
                    if (!res.ok) throw new Error(data?.error || "Failed to send reply");

                    showToast(
                      t.langToggleHint === "Język" ? "Wiadomość wysłana" : "Reply sent",
                      t.langToggleHint === "Język"
                        ? `Odpowiedź została wysłana do: ${replyingTo.email}`
                        : `Your reply was sent to: ${replyingTo.email}`
                    );

                    setReplyingTo(null);
                    setReplyText("");
                  } catch (e) {
                    showToast(
                      t.langToggleHint === "Język" ? "Błąd" : "Error",
                      e.message || (t.langToggleHint === "Język" ? "Nie udało się wysłać odpowiedzi." : "Failed to send reply.")
                    );
                  } finally {
                    setReplySending(false);
                  }
                }}
              >
                {replySending
                  ? t.langToggleHint === "Język"
                    ? "Wysyłanie..."
                    : "Sending..."
                  : t.langToggleHint === "Język"
                  ? "Wyślij"
                  : "Send"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {/* ================= END REPLY MODAL ================= */}
    </div>
  );
}

/* ================= PUBLIC PAGES ================= */
function HomePage({ onBook, dark, t, categories }) {
  return (
    <div className="pb-6">
      <HeroBackdrop
        bgImage={BACKGROUNDS.home}
        dark={dark}
        accent="from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]"
        backdropHeightClass="min-h-[1020px] md:min-h-[1160px]"
        style={{ backgroundPosition: "center 35%" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Hero
            title={t.homeHeroTitle}
            subtitle={t.homeHeroSubtitle}
            primary={
              <Button className="rounded-full px-10 py-6" onClick={() => onBook(t.bookGeneral)}>
                {t.book}
              </Button>
            }
            secondary={
              <div className="flex items-center gap-3 text-sm opacity-80 px-2">
                <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                <span className="tracking-tight">{t.homeHeroMeta}</span>
              </div>
            }
          />

          <InfoGrid
            t={t}
            dark={dark}
            items={categories.map((c) => ({
              title: c.title,
              desc: c.description,
              to: `#/${c.key}`,
              meta: c.subtitle,
              quote: c.key === "wellness" ? c.quote : null,
            }))}
          />

          <QuoteBand quote={t.homeQuoteBand} />
        </div>
      </HeroBackdrop>
    </div>
  );
}

function WellnessCatalogPage({ category, onBook, dark, t }) {
  const quote = t.quote.wellness_home;
  const groups = t.wellnessCatalog?.groups || [];

  return (
    <div className="pb-10">
      <HeroBackdrop
        bgImage={category.heroImage}
        dark={dark}
        accent={category.accent}
        backdropHeightClass="min-h-[980px] md:min-h-[1120px]"
        style={{ backgroundPosition: "center 47%" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Hero
            title={t.wellnessCatalog?.title || category.title}
            subtitle={t.wellnessCatalog?.subtitle || category.description}
            padClass="pt-14 pb-6 md:pt-16 md:pb-8"
            primary={
              <NavLink to="#/" className="inline-flex">
                <Button className="rounded-full px-10 py-6">{t.backToHome}</Button>
              </NavLink>
            }
            secondary={
              <div className="flex items-center gap-3 text-sm opacity-80 px-2">
                <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                <span className="tracking-tight">{category.subtitle}</span>
              </div>
            }
          />

          <QuoteBand quote={quote} />

          <section className="max-w-7xl mx-auto px-0 py-8">
            <div className="grid lg:grid-cols-2 gap-10">
              {groups.map((g) => (
                <div
                  key={g.title}
                  className={cx(
                    "rounded-[2rem] backdrop-blur border shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)] overflow-hidden",
                    dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                  )}
                >
                  <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                  <div className="p-9 md:p-10">
                    <h3
                      className="mb-6 leading-tight"
                      style={{
                        fontFamily: "var(--ow-display)",
                        letterSpacing: "-0.02em",
                        fontWeight: 650,
                        fontSize: "22px",
                      }}
                    >
                      {g.title}
                    </h3>

                    <div className="grid gap-3">
                      {g.items.map((it) => (
                        <motion.button
                          key={it.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          onClick={() => onBook(it.name)} // ✅ only open booking
                          className={cx(
                            "w-full text-left rounded-2xl border px-5 py-4 transition flex items-start justify-between gap-4",
                            dark
                              ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                              : "border-black/10 bg-white hover:bg-black/[0.02]"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="font-semibold tracking-tight">{it.name}</div>
                            <div className="text-xs opacity-70 mt-1">{it.duration || t.bookingDuration}</div>
                            <div className="text-[13px] opacity-75 mt-3 line-clamp-2">
                              {it.desc}
                            </div>
                          </div>

                          <span className={cx("text-sm opacity-80 whitespace-nowrap", dark ? "text-white" : "text-neutral-900")}>
                            {t.book} {/* ✅ better than "open" now */}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-10 text-center relative">
            <div className={cx("absolute left-1/2 -top-4 -translate-x-1/2 h-10 w-px", dark ? "bg-white/20" : "bg-neutral-300")} />
            <Button className="rounded-full px-14 py-7" onClick={() => onBook(t.bookGeneral)}>
              {t.bookGeneral}
            </Button>
          </section>
        </div>
      </HeroBackdrop>
    </div>
  );
}

function CategoryPage({ category, onBook, dark, t }) {
  const categoryQuote =
    category.key === "yoga" ? t.quote.yoga_1 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-10">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} backdropHeightClass="min-h-[1020px] md:min-h-[1160px]"
        style={{ backgroundPosition: "center 47%" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Hero
            title={category.title}
            subtitle={category.description}
            primary={
              <Button className="rounded-full px-10 py-6" onClick={() => onBook(category.title)}>
                {t.book}
              </Button>
            }
            secondary={
              <NavLink to="#/" className="inline-flex">
                <Button variant="outline" className={cx("rounded-full px-10 py-6", dark ? "" : "border-black/10 bg-white")}>
                  {t.backToHome}
                </Button>
              </NavLink>
            }
          />
          <QuoteBand quote={categoryQuote} />
          <InfoGrid
            t={t}
            dark={dark}
            items={category.children.map((ch) => ({ title: ch.title, desc: ch.blurb, to: ch.route, meta: category.subtitle }))}
          />
        </div>
      </HeroBackdrop>
    </div>
  );
}

function SubTopicPage({ category, sub, onBook, dark, t, products }) {
  const isWellness = category.key === "wellness";
  const filtered = useMemo(() => products.filter((p) => p.for === sub.key), [products, sub.key]);

  const bodyBlocks = useMemo(() => {
    if (category.key === "education") {
      if (sub.key === "no-sugar-adults") return t.subBlocks.noSugarAdults;
      if (sub.key === "no-sugar-kids") return t.subBlocks.noSugarKids;
      if (sub.key === "whats-up-body-kids") return t.subBlocks.whatsUpBodyKids;
      if (sub.key === "whats-up-body-adults") return t.subBlocks.whatsUpBodyAdults;
      if (sub.key === "no-upf-adults") return t.subBlocks.noUPFAdults;
      if (sub.key === "tox-free") return t.subBlocks.toxFree;
      return t.subBlocks.educationDefault;
    }
    if (category.key === "yoga") return t.subBlocks.yoga;
    return t.subBlocks.wellness;
  }, [category.key, sub.key, t]);

  const quoteForThisSubpage =
    category.key === "yoga" ? t.quote.yoga_2 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-12">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} backdropHeightClass="min-h-[1120px] md:min-h-[1280px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Hero
            title={sub.title}
            subtitle={sub.blurb}
            primary={
              isWellness ? (
                <NavLink to={`#/${category.key}`} className="inline-flex">
                  <Button className="rounded-full px-10 py-6">{t.browseMore}</Button>
                </NavLink>
              ) : (
                <Button className="rounded-full px-10 py-6" onClick={() => onBook(sub.title)}>
                  {t.book}
                </Button>
              )
            }
            secondary={
              <NavLink to={`#/${category.key}`} className="inline-flex">
                <Button variant="outline" className={cx("rounded-full px-10 py-6", dark ? "" : "border-black/10 bg-white")}>
                  {t.back}
                </Button>
              </NavLink>
            }
          />

          <QuoteBand quote={quoteForThisSubpage} />

          <section className="max-w-7xl mx-auto px-0 py-10">
            <div className="grid md:grid-cols-2 gap-10">
              {bodyBlocks.map((b) => {
                const text = b.textKey ? t.copy[b.textKey] : b.text;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cx(
                      "rounded-[2rem] backdrop-blur border shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)] p-10 overflow-hidden",
                      dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                    )}
                  >
                    <div className={cx("h-1 w-14 mb-6 bg-gradient-to-r", CARD_LINE)} />
                    <h3
                      className="mb-3 leading-tight"
                      style={{ fontFamily: "var(--ow-display)", letterSpacing: "-0.02em", fontWeight: 650, fontSize: "24px" }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-[13.5px] opacity-85 leading-relaxed tracking-[-0.01em]">{text}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {isWellness ? (
            <section className="max-w-7xl mx-auto px-0 py-10">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] opacity-60">{t.subProductsTitle}</p>
                  <p className="text-sm opacity-75 tracking-[-0.01em]">{t.subProductsSub}</p>
                </div>
                <div className={cx("h-1 w-40 rounded-full bg-gradient-to-r", category.accent)} />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="h-full"
                  >
                    <div
                      className={cx(
                        "h-full rounded-[2rem] backdrop-blur border shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)] overflow-hidden flex flex-col",
                        dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                      )}
                    >
                      <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                      <div className={cx("h-40", dark ? "bg-white/[0.05]" : "bg-neutral-200/70")} aria-label={t.productImageAlt} />
                      <div className="p-8 flex flex-col h-full">
                        <div className="flex-1">
                          <h4 style={{ fontFamily: "var(--ow-display)", fontWeight: 650, letterSpacing: "-0.02em" }} className="text-xl mb-1">
                            {p.title}
                          </h4>
                          <p className="text-sm opacity-70">{p.tone}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-semibold">{p.price}</p>
                          <Button variant="outline" className="rounded-full">
                            {t.view}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filtered.length === 0 ? (
                  <div className={cx("rounded-[2rem] border p-10 opacity-80", dark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/80")}>
                    {t.noProducts}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          <section className="py-16 text-center relative">
            <div className={cx("absolute left-1/2 -top-6 -translate-x-1/2 h-12 w-px", dark ? "bg-white/20" : "bg-neutral-300")} />
            {isWellness ? (
              <NavLink to={`#/${category.key}`}>
                <Button className="rounded-full px-14 py-7">{t.backTo(category.title)}</Button>
              </NavLink>
            ) : (
              <Button className="rounded-full px-14 py-7" onClick={() => onBook(sub.title)}>
                {t.book}
              </Button>
            )}
          </section>
        </div>
      </HeroBackdrop>
    </div>
  );
}

/* ================= ROUTE PARSER ================= */
function parseRoute(hash, categories) {
  if (hash === "#/" || hash === "#" || !hash) return { page: "home" };

  const parts = hash.replace(/^#\//, "").split("/");

  if (parts[0] === "admin") {
    if (parts[1] === "login") return { page: "admin_login" };
    if (parts[1] === "dashboard") return { page: "admin_dashboard" };
    return { page: "admin_login" };
  }

  const catKey = parts[0];
  const subKey = parts[1];

  const category = categories.find((c) => c.key === catKey);
  if (!category) return { page: "home" };

  if (!subKey) return { page: "category", category };

  const route = `#/${category.key}/${subKey}`;
  const sub = category.children.find((c) => c.route === route);

  if (!sub) return { page: "category", category };
  return { page: "sub", category, sub };
}

/* ================= APP ================= */
export default function AppDesktop() {
  const route = useHashRoute();

  const [lang, setLang] = useState(getInitialLang());
  const t = I18N[lang];

  const categories = useMemo(() => buildCategories(t), [t]);
  const products = useMemo(() => buildProducts(t), [t]);

  const parsed = useMemo(() => parseRoute(route, categories), [route, categories]);

  const [dark, setDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState(t.book);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    setBookingContext((c) => c || t.book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const openBooking = (context) => {
    setBookingContext(context);
    setBookingOpen(true);
  };

  const toggleLang = (next) => {
    setLang(next);
    try {
      window.localStorage.setItem("ow_lang", next);
    } catch {}
  };

  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  return (
    <Shell
      dark={dark}
      onToggleDark={() => setDark((d) => !d)}
      lang={lang}
      onToggleLang={toggleLang}
      t={t}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={route + "_" + lang}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {parsed.page === "home" ? <HomePage onBook={openBooking} dark={dark} t={t} categories={categories} /> : null}

          {parsed.page === "category" && parsed.category ? (
            parsed.category.key === "wellness" ? (
              <WellnessCatalogPage category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            ) : (
              <CategoryPage category={parsed.category} onBook={openBooking} dark={dark} t={t} />
            )
          ) : null}

          {parsed.page === "sub" && parsed.category && parsed.sub ? (
            <SubTopicPage category={parsed.category} sub={parsed.sub} onBook={openBooking} dark={dark} t={t} products={products} />
          ) : null}

          {parsed.page === "admin_login" ? (
            <AdminLoginPage
              dark={dark}
              onAuthed={() => {
                window.location.hash = "#/admin/dashboard";
              }}
            />
          ) : null}

          {parsed.page === "admin_dashboard" ? (
            token ? (
              <AdminDashboardPage dark={dark} t={t} />
            ) : (
              <AdminLoginPage
                dark={dark}
                onAuthed={() => {
                  window.location.hash = "#/admin/dashboard";
                }}
              />
            )
          ) : null}
        </motion.div>
      </AnimatePresence>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} contextTitle={bookingContext} t={t} />
      {/* Contact popup only on Education pages */}
      {parsed.page !== "admin_login" &&
      parsed.page !== "admin_dashboard" &&
      parsed.page !== "home" &&
      parsed.category?.key === "education" ? (
        <ContactPopup
          open={contactOpen}
          onOpen={() => setContactOpen(true)}
          onClose={() => setContactOpen(false)}
          dark={dark}
          t={t}
        />
      ) : null}
    </Shell>
  );
}
export { I18N, getInitialLang, buildCategories, buildProducts };