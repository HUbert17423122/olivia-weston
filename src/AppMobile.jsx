// src/AppMobile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= IMPORT LOCAL ASSET BACKGROUNDS ================= */
import bgHome from "./assets/backgrounds/home.jpg";
import bgYoga from "./assets/backgrounds/yoga.jpg";
import bgEducation from "./assets/backgrounds/education.jpg";
import bgWellness from "./assets/backgrounds/wellness.jpg";

/* ================= CONFIG ================= */
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

/* ================= GLOBAL CARD LINE ================= */
const CARD_LINE = "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

/* ================= BUTTON ================= */
function Button({ children, className = "", variant, ...props }) {
  const base =
    "inline-flex items-center justify-center text-[13px] font-semibold transition rounded-full px-5 py-3 select-none focus:outline-none focus:ring-2 focus:ring-offset-2";
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

/* ================= I18N (copied 1:1 from desktop) ================= */
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
        kids: { title: "Joga terapeutyczna dla dzieci", blurb: "Yoga Kids to więcej niż tylko ruch. To zajęcia, które rosną razem z Twoim dzieckiem..." },
        adults: { title: "Joga terapeutyczna dla dorosłych", blurb: "Odkryj moc klasycznej jogi z elementami jogi Nidry..." },
        seniors: { title: "Joga terapeutyczna dla seniorów", blurb: "Odpowiadając na Twoje potrzeby, stworzę jogę dla seniorów..." },
      },
      education: {
        noSugarAdults: { title: "Bez cukru – dorośli", blurb: "Zrozum wpływ węglowodanów na energię, nastrój i zdrowie — i odzyskaj kontrolę..." },
        noSugarKids: { title: "Bez cukru – dzieci", blurb: "Zabawna i prosta edukacja: skąd mamy energię..." },
        whatsUpBodyKids: { title: "What's Up Body – dzieci", blurb: "Program edukacyjny dla dzieci: „Moje ciało wysyła wiadomości”..." },
        whatsUpBodyAdults: { title: "What's Up Body – dorośli", blurb: "Program edukacyjny: „Objawy nie mają wieku”..." },
        noUPFAdults: { title: "No UPF – dorośli", blurb: "Program o ultra-przetworzonej żywności (UPF)..." },
        toxFree: { title: "Tox Free", blurb: "Program o chemii w codziennym życiu..." },
      },
      wellness: {
        bodyMind: { title: "Ciało i umysł", blurb: "Narzędzia wspierające relaks, regenerację i równowagę..." },
        release: { title: "Uwolnienie", blurb: "Produkty wspierające rozluźnienie napięć..." },
        beauty: { title: "Piękno", blurb: "Rytuały i produkty podkreślające naturalne piękno..." },
      },
    },
    subBlocks: {
      educationDefault: [{ title: "Bezpieczna przestrzeń", textKey: "educationIntro" }],
      noSugarAdults: [{ title: "Bez cukru — dorośli", textKey: "noSugarAdults" }],
      noSugarKids: [{ title: "Bez cukru — dzieci", textKey: "noSugarKids" }],
      whatsUpBodyKids: [{ title: "What's Up Body – dzieci", textKey: "whatsUpBodyKids" }],
      whatsUpBodyAdults: [{ title: "What's Up Body – dorośli", textKey: "whatsUpBodyAdults" }],
      noUPFAdults: [{ title: "No UPF – dorośli", textKey: "noUPFAdults" }],
      toxFree: [{ title: "Tox Free", textKey: "toxFree" }],
      yoga: [{ title: "Praktyka", textKey: "yogaIntro" }],
      wellness: [{ title: "Równowaga", text: "Wellness to codzienna, łagodna troska o siebie..." }],
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
      groups: [], // keep as-is; your desktop has full EN too
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
        "Welcome to a space where yoga is a dialogue between the soul and the body. I am Olivia– for me, yoga is not a profession, but a calling of the heart...",
      educationIntro:
        "Together, we will create a safe space where you will regain mindfulness and trust in yourself...",
      wellnessIntro:
        "Deep down, you desire not only to look good — you yearn to feel light, vital, and in complete harmony with yourself...",
      noSugarAdults: "The Sugar Trap\n\nI present the educational programme \"No Sugar\" – \"The Sugar Trap\"...",
      noSugarKids:
        "During our adventure, we will discover where we get the energy for play and learning...",
      whatsUpBodyKids:
        "Educational Programme: \"What's Up Body?\" - \"My Body Sends Messages\"...",
      whatsUpBodyAdults:
        "I present the educational program \"What's Up Body\" – \"Symptoms Have No Age\"...",
      noUPFAdults:
        "I present the educational programme \"No UPF\" – \"Ultra-processed foods and their impact on health\"...",
      toxFree:
        "You are invited to the \"Tox Free\" program – a comprehensive meeting about chemistry in your daily life...",
    },
    categories: {
      yoga: { title: "Yoga", subtitle: "Therapeutic movement" },
      education: { title: "Education", subtitle: "Informed guidance" },
      wellness: { title: "Wellness", subtitle: "Holistic self-care" },
    },
    subtopics: {
      yoga: {
        kids: { title: "Yoga Kids", blurb: "Yoga Kids – More Than Just Movement..." },
        adults: { title: "Yoga Adults", blurb: "Classic Yoga enriched with deep Nidra practice..." },
        seniors: { title: "Yoga Seniors", blurb: "In response to your needs, I will create a seniors' yoga practice..." },
      },
      education: {
        noSugarAdults: { title: "No Sugar - Adults", blurb: "Understand sugar's impact on energy, mood and health..." },
        noSugarKids: { title: "No Sugar - Kids", blurb: "Support healthier habits with calm guidance..." },
        whatsUpBodyKids: { title: "What's Up Body – Kids", blurb: "Educational program for children..." },
        whatsUpBodyAdults: { title: "What's Up Body – Adults", blurb: "Educational program: 'Symptoms Have No Age'..." },
        noUPFAdults: { title: "No UPF – Adults", blurb: "Program about ultra-processed foods (UPF)..." },
        toxFree: { title: "Tox Free", blurb: "Program about chemistry in daily life..." },
      },
      wellness: {
        bodyMind: { title: "Body & Mind", blurb: "Tools that support relaxation..." },
        release: { title: "Release", blurb: "Products designed to ease tension..." },
        beauty: { title: "Beauty", blurb: "Rituals and products that enhance natural beauty..." },
      },
    },
    subBlocks: {
      educationDefault: [{ title: "Safe space", textKey: "educationIntro" }],
      noSugarAdults: [{ title: "No sugar — adults", textKey: "noSugarAdults" }],
      noSugarKids: [{ title: "No sugar — kids", textKey: "noSugarKids" }],
      whatsUpBodyKids: [{ title: "What's Up Body — kids", textKey: "whatsUpBodyKids" }],
      whatsUpBodyAdults: [{ title: "What's Up Body — adults", textKey: "whatsUpBodyAdults" }],
      noUPFAdults: [{ title: "No UPF — adults", textKey: "noUPFAdults" }],
      toxFree: [{ title: "Tox Free", textKey: "toxFree" }],
      yoga: [{ title: "Practice", textKey: "yogaIntro" }],
      wellness: [{ title: "Balance", text: "Wellness is daily, gentle care..." }],
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

/* ================= LOCAL ASSET BACKGROUNDS MAP ================= */
const BACKGROUNDS = {
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

/* ================= MOBILE SHELL ================= */
function MobileShell({ dark, onToggleDark, lang, onToggleLang, t, children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

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

      {/* Top bar */}
      <header className="max-w-7xl mx-auto px-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <NavLink
            to="#/"
            className={cx(
              "tracking-[0.16em] text-[11px] uppercase transition",
              "opacity-90 hover:opacity-100",
              "whitespace-nowrap",
              dark ? "text-white" : "text-neutral-900"
            )}
            style={{ fontFamily: "var(--ow-sans)" }}
          >
            {t.navBrand}
          </NavLink>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setMenuOpen((v) => !v)}
              className={cx("rounded-full px-3 py-2 text-[12px]", dark ? "hover:bg-white/10" : "hover:bg-black/5")}
            >
              {menuOpen ? "Close" : "Menu"}
            </Button>
          </div>
        </div>

        {/* Dropdown menu */}
        {menuOpen ? (
          <div
            className={cx(
              "mt-3 rounded-2xl border overflow-hidden",
              dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
            )}
          >
            <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
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

                <Button
                  variant="ghost"
                  onClick={onToggleDark}
                  className={cx("rounded-full px-3 py-2 text-[12px]", dark ? "hover:bg-white/10" : "hover:bg-black/5")}
                >
                  {dark ? t.darkToggleLight : t.darkToggleDark}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <NavLink to="#/" className="inline-flex">
                  <Button variant="outline" className={cx("w-full rounded-full", dark ? "" : "border-black/10 bg-white")}>
                    Home
                  </Button>
                </NavLink>

                <NavLink to={token ? "#/admin/dashboard" : "#/admin/login"} className="inline-flex">
                  <Button variant="outline" className={cx("w-full rounded-full", dark ? "" : "border-black/10 bg-white")}>
                    {token ? t.dashboard : t.admin}
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="max-w-7xl mx-auto px-5 py-10 opacity-70 text-sm">
        <div className="flex flex-col gap-2">
          <p className="tracking-tight">{t.footerTagline}</p>
          <p className="tracking-tight">{t.footerCopyright(new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}

/* ================= HERO BACKDROP (mobile tuned) ================= */
function HeroBackdrop({ bgImage, dark, accent, style, children }) {
  return (
    <div
      className="relative overflow-hidden min-h-[860px]"
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

      <div className={dark ? "absolute inset-0 bg-black/55" : "absolute inset-0 bg-white/30"} />
      <div
        className={
          dark
            ? "absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-[#0b0f0f]"
            : "absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-[#f5f7f7]"
        }
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ================= HERO (mobile tuned) ================= */
function Hero({ title, subtitle, primary, secondary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-10 pb-6">
        <div className="max-w-xl">
          <motion.h1
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mb-5 leading-[0.98]"
            style={{
              fontFamily: "var(--ow-display)",
              letterSpacing: "-0.03em",
              fontWeight: 650,
              fontSize: "clamp(34px, 8.5vw, 54px)",
            }}
          >
            {title}
          </motion.h1>

          <p className="text-[14px] opacity-85 leading-relaxed mb-6">{subtitle}</p>

          <div className="flex flex-col gap-3 items-stretch">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INFO GRID (always 1 col on mobile) ================= */
function InfoGrid({ items, dark, t }) {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-10">
      <div className="grid grid-cols-1 gap-5">
        {items.map((it) => (
          <motion.div
            key={it.to}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="h-full"
          >
            <NavLink to={it.to} className="block h-full">
              <div
                className={cx(
                  "h-full rounded-[1.6rem] overflow-hidden flex flex-col border shadow-[0_18px_45px_-32px_rgba(0,0,0,.55)]",
                  dark ? "bg-white/[0.06] backdrop-blur border-white/10" : "bg-white/0 backdrop-blur border-black/10"
                )}
              >
                <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3
                      className="mb-2 leading-tight"
                      style={{
                        fontFamily: "var(--ow-display)",
                        letterSpacing: "-0.02em",
                        fontWeight: 650,
                        fontSize: "20px",
                      }}
                    >
                      {it.title}
                    </h3>

                    {it.meta ? <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-3">{it.meta}</p> : null}

                    {it.quote ? <p className="text-[13px] italic opacity-80 leading-relaxed mb-3">{it.quote}</p> : null}

                    <p className="text-[13px] opacity-85 leading-relaxed">{it.desc}</p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm opacity-85">
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
    <section className="py-8 relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="leading-snug"
          style={{
            fontFamily: "var(--ow-display)",
            letterSpacing: "-0.02em",
            fontWeight: 600,
            fontSize: "clamp(18px, 5vw, 26px)",
          }}
        >
          {quote}
        </motion.p>
      </div>
    </section>
  );
}

/* ================= BOOKING MODAL (mobile: bottom-sheet feel) ================= */
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
  return d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
}
function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
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
    if (!open) return;
    let alive = true;

    (async () => {
      try {
        const qs = new URLSearchParams({
          date: pickedDate ? formatDateISO(pickedDate) : "",
          context: contextTitle || "",
        });

        const res = await fetch(`${API_BASE}/appointments/availability?${qs.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pickedDate, contextTitle]);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[720px] rounded-t-[2rem] bg-white shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)] overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
              {t.bookingTitle}
            </h3>
            <p className="text-xs opacity-70 mt-1 truncate">{contextTitle}</p>
          </div>

          <Button variant="ghost" onClick={onClose} className="hover:bg-black/5">
            {t.bookingClose}
          </Button>
        </div>

        <div className="p-5 grid gap-6 max-h-[78vh] overflow-auto">
          {/* Dates */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-3">{t.bookingSelectDay}</p>
            <div className="grid grid-cols-2 gap-3">
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

          {/* Time */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-3">{t.bookingSelectTime}</p>
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
                    <div className="text-xs opacity-70">{isTaken ? (t.langToggleHint === "Język" ? "Zajęte" : "Booked") : t.bookingDuration}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-3">
            <input className="rounded-2xl border border-neutral-200 px-4 py-3" placeholder={t.formName} value={name} onChange={(e) => setName(e.target.value)} />
            <input className="rounded-2xl border border-neutral-200 px-4 py-3" placeholder={t.formPhone} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className="rounded-2xl border border-neutral-200 px-4 py-3" placeholder={t.formEmail} value={email} onChange={(e) => setEmail(e.target.value)} />
            {submitErr ? <p className="text-sm text-red-600">{submitErr}</p> : null}
          </div>

          {!bookingEnabled ? (
            <div className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-sm font-semibold">
                {t.langToggleHint === "Język" ? "Rezerwacje są chwilowo wyłączone." : "Bookings are temporarily closed."}
              </p>
              <p className="text-xs opacity-70 mt-1">
                {t.langToggleHint === "Język" ? "Spróbuj ponownie później lub skontaktuj się bezpośrednio." : "Please try again later or contact us directly."}
              </p>
            </div>
          ) : null}

          <div className="pb-2">
            {!confirmed ? (
              <Button
                className="rounded-full w-full py-4"
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

                    const data = await res.json().catch(() => ({}));

                    if (res.status === 409) {
                      setSubmitErr(t.langToggleHint === "Język" ? "Ten termin jest już zajęty." : "This slot is already booked.");
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
                {submitting ? (t.langToggleHint === "Język" ? "Wysyłanie…" : "Sending…") : t.bookingConfirm}
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
      </motion.div>
    </div>
  );
}

/* ================= CONTACT POPUP (mobile bottom sheet) ================= */
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
      <div className="fixed bottom-5 right-5 z-40">
        {!open ? (
          <Button className="rounded-full px-6 py-4 shadow-[0_22px_55px_-35px_rgba(0,0,0,.55)]" onClick={onOpen}>
            {t.contact.open}
          </Button>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/45" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className={cx(
              "relative w-full max-w-[720px] rounded-t-[2rem] overflow-hidden shadow-[0_40px_120px_-60px_rgba(0,0,0,.7)]",
              dark ? "bg-[#0f1414] text-white" : "bg-white text-neutral-900"
            )}
          >
            <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

            <div className={cx("p-5 border-b", dark ? "border-white/10" : "border-black/10")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl">
                    {t.contact.title}
                  </h3>
                  <p className="text-xs opacity-70 mt-1">Education</p>
                </div>

                <Button variant="ghost" onClick={onClose} className={dark ? "hover:bg-white/10" : "hover:bg-black/5"}>
                  {t.contact.close}
                </Button>
              </div>
            </div>

            <div className="p-5 grid gap-3 max-h-[78vh] overflow-auto">
              <input
                className={cx("rounded-2xl px-4 py-3 border outline-none", dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10")}
                placeholder={t.contact.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className={cx("rounded-2xl px-4 py-3 border outline-none", dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10")}
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
                  className="rounded-full w-full py-4 mt-1"
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
                      const data = await res.json().catch(() => ({}));
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

/* ================= ADMIN PAGES (same logic, mobile widths) ================= */
function AdminLoginPage({ dark, onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className={cx("max-w-lg rounded-[2rem] border p-7 overflow-hidden", dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10")}>
        <div className={cx("h-[5px] w-full rounded-full mb-6 bg-gradient-to-r", CARD_LINE)} />
        <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-2xl mb-1">
          Admin Login
        </h1>
        <p className="text-sm opacity-75 mb-6">Sign in to manage bookings.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Email</label>
            <input
              className={cx("mt-2 w-full rounded-2xl px-4 py-3 border outline-none", dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.22em] opacity-60">Password</label>
            <input
              className={cx("mt-2 w-full rounded-2xl px-4 py-3 border outline-none", dark ? "bg-white/[0.06] border-white/10" : "bg-white border-black/10")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </div>

          {err ? <p className="text-sm text-red-400">{err}</p> : null}

          <Button
            className="rounded-full w-full py-4"
            onClick={async () => {
              setErr("");
              setLoading(true);
              try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });
                const data = await res.json().catch(() => ({}));
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

          <div className="pt-2">
            <a href="#/" className={cx("text-sm underline underline-offset-4 opacity-70 hover:opacity-100", dark ? "text-white" : "text-neutral-900")}>
              Back to site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardPage({ dark, t }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ow_admin_token") : null;

  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
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

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-2xl">
            {t.dashboard}
          </h1>
          <p className="text-sm opacity-75">Manage booking requests.</p>
        </div>

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

      <div className={cx("rounded-[2rem] border overflow-hidden", dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10")}>
        <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />

        {loading ? (
          <div className="p-6 opacity-80">Loading…</div>
        ) : err ? (
          <div className="p-6 text-red-400">{err}</div>
        ) : (
          <div className="p-5 grid gap-3">
            {items.map((it) => (
              <div
                key={it.id}
                className={cx("rounded-2xl border p-4", dark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white")}
              >
                <div className="text-sm font-semibold">{it.name}</div>
                <div className="text-xs opacity-75 mt-1">
                  {it.date} • {it.time}
                </div>
                <div className="text-xs opacity-75 mt-1">{it.phone}</div>
                {it.context ? <div className="text-xs opacity-70 mt-2">{it.context}</div> : null}
              </div>
            ))}

            {items.length === 0 ? <div className="opacity-70 text-sm">No booking requests yet.</div> : null}

            <div className="pt-2">
              <Button
                variant="outline"
                className={cx("rounded-full w-full", dark ? "" : "border-black/10 bg-white")}
                onClick={() => (window.location.hash = "#/")}
              >
                Back to site
              </Button>
            </div>
          </div>
        )}
      </div>
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
        style={{ backgroundPosition: "center 35%" }}
      >
        <div className="max-w-7xl mx-auto">
          <Hero
            title={t.homeHeroTitle}
            subtitle={t.homeHeroSubtitle}
            primary={
              <Button className="rounded-full w-full py-4" onClick={() => onBook(t.bookGeneral)}>
                {t.book}
              </Button>
            }
            secondary={
              <div className="flex items-center justify-center gap-3 text-sm opacity-80 px-2">
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
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} style={{ backgroundPosition: "center 47%" }}>
        <div className="max-w-7xl mx-auto px-5">
          <Hero
            title={t.wellnessCatalog?.title || category.title}
            subtitle={t.wellnessCatalog?.subtitle || category.description}
            primary={
              <NavLink to="#/" className="inline-flex w-full">
                <Button className="rounded-full w-full py-4">{t.backToHome}</Button>
              </NavLink>
            }
            secondary={
              <div className="flex items-center justify-center gap-3 text-sm opacity-80 px-2">
                <span className={cx("h-px w-10", dark ? "bg-white/30" : "bg-neutral-300")} />
                <span className="tracking-tight">{category.subtitle}</span>
              </div>
            }
          />

          <QuoteBand quote={quote} />

          <section className="py-6">
            <div className="grid gap-6">
              {groups.map((g) => (
                <div
                  key={g.title}
                  className={cx(
                    "rounded-[1.6rem] backdrop-blur border shadow-[0_18px_45px_-32px_rgba(0,0,0,.55)] overflow-hidden",
                    dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                  )}
                >
                  <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                  <div className="p-6">
                    <h3 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl mb-4">
                      {g.title}
                    </h3>

                    <div className="grid gap-3">
                      {g.items.map((it) => (
                        <motion.button
                          key={it.id}
                          whileTap={{ scale: 0.99 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          onClick={() => onBook(it.name)}
                          className={cx(
                            "w-full text-left rounded-2xl border px-4 py-4 transition flex items-start justify-between gap-4",
                            dark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]" : "border-black/10 bg-white hover:bg-black/[0.02]"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="font-semibold tracking-tight">{it.name}</div>
                            <div className="text-xs opacity-70 mt-1">{it.duration || t.bookingDuration}</div>
                            <div className="text-[13px] opacity-75 mt-3 line-clamp-3">{it.desc}</div>
                          </div>

                          <span className={cx("text-sm opacity-80 whitespace-nowrap", dark ? "text-white" : "text-neutral-900")}>
                            {t.book}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8 text-center">
            <Button className="rounded-full w-full py-4" onClick={() => onBook(t.bookGeneral)}>
              {t.bookGeneral}
            </Button>
          </section>
        </div>
      </HeroBackdrop>
    </div>
  );
}

function CategoryPage({ category, onBook, dark, t }) {
  const categoryQuote = category.key === "yoga" ? t.quote.yoga_1 : category.key === "education" ? t.quote.education : t.quote.wellness_home;

  return (
    <div className="pb-10">
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent} style={{ backgroundPosition: "center 47%" }}>
        <div className="max-w-7xl mx-auto px-5">
          <Hero
            title={category.title}
            subtitle={category.description}
            primary={
              <Button className="rounded-full w-full py-4" onClick={() => onBook(category.title)}>
                {t.book}
              </Button>
            }
            secondary={
              <NavLink to="#/" className="inline-flex w-full">
                <Button variant="outline" className={cx("rounded-full w-full py-4", dark ? "" : "border-black/10 bg-white")}>
                  {t.backToHome}
                </Button>
              </NavLink>
            }
          />

          <QuoteBand quote={categoryQuote} />

          <InfoGrid
            t={t}
            dark={dark}
            items={category.children.map((ch) => ({
              title: ch.title,
              desc: ch.blurb,
              to: ch.route,
              meta: category.subtitle,
            }))}
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
      <HeroBackdrop bgImage={category.heroImage} dark={dark} accent={category.accent}>
        <div className="max-w-7xl mx-auto px-5">
          <Hero
            title={sub.title}
            subtitle={sub.blurb}
            primary={
              isWellness ? (
                <NavLink to={`#/${category.key}`} className="inline-flex w-full">
                  <Button className="rounded-full w-full py-4">{t.browseMore}</Button>
                </NavLink>
              ) : (
                <Button className="rounded-full w-full py-4" onClick={() => onBook(sub.title)}>
                  {t.book}
                </Button>
              )
            }
            secondary={
              <NavLink to={`#/${category.key}`} className="inline-flex w-full">
                <Button variant="outline" className={cx("rounded-full w-full py-4", dark ? "" : "border-black/10 bg-white")}>
                  {t.back}
                </Button>
              </NavLink>
            }
          />

          <QuoteBand quote={quoteForThisSubpage} />

          <section className="py-6">
            <div className="grid gap-5">
              {bodyBlocks.map((b) => {
                const text = b.textKey ? t.copy[b.textKey] : b.text;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className={cx(
                      "rounded-[1.6rem] backdrop-blur border shadow-[0_18px_45px_-32px_rgba(0,0,0,.55)] p-6 overflow-hidden",
                      dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                    )}
                  >
                    <div className={cx("h-1 w-14 mb-5 bg-gradient-to-r", CARD_LINE)} />
                    <h3 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-xl mb-2">
                      {b.title}
                    </h3>
                    <p className="text-[13px] opacity-85 leading-relaxed whitespace-pre-wrap">{text}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {isWellness ? (
            <section className="py-6">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] opacity-60">{t.subProductsTitle}</p>
                  <p className="text-sm opacity-75">{t.subProductsSub}</p>
                </div>
                <div className={cx("h-1 w-28 rounded-full bg-gradient-to-r", category.accent)} />
              </div>

              <div className="grid gap-5">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className={cx(
                      "rounded-[1.6rem] backdrop-blur border shadow-[0_18px_45px_-32px_rgba(0,0,0,.55)] overflow-hidden",
                      dark ? "bg-white/[0.06] border-white/10" : "bg-white/80 border-black/10"
                    )}
                  >
                    <div className={cx("h-[5px] w-full bg-gradient-to-r", CARD_LINE)} />
                    <div className={cx("h-36", dark ? "bg-white/[0.05]" : "bg-neutral-200/70")} aria-label={t.productImageAlt} />
                    <div className="p-6">
                      <h4 style={{ fontFamily: "var(--ow-display)", fontWeight: 650 }} className="text-lg mb-1">
                        {p.title}
                      </h4>
                      <p className="text-sm opacity-70">{p.tone}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold">{p.price}</p>
                        <Button variant="outline" className="rounded-full">
                          {t.view}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 ? (
                  <div className={cx("rounded-[1.6rem] border p-6 opacity-80", dark ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/80")}>
                    {t.noProducts}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          <section className="py-10 text-center">
            {isWellness ? (
              <NavLink to={`#/${category.key}`}>
                <Button className="rounded-full w-full py-4">{t.backTo(category.title)}</Button>
              </NavLink>
            ) : (
              <Button className="rounded-full w-full py-4" onClick={() => onBook(sub.title)}>
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

/* ================= APP MOBILE ================= */
export default function AppMobile() {
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
    <MobileShell
      dark={dark}
      onToggleDark={() => setDark((d) => !d)}
      lang={lang}
      onToggleLang={toggleLang}
      t={t}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={route + "_" + lang}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
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
    </MobileShell>
  );
}