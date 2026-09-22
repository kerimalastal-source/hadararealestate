export const locales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export type SiteCopy = {
  skip: string; nav: string[]; search: string; searchPlaceholder: string; noResults: string; contact: string;
  heroKicker: string; heroTitle: string; heroText: string; heroImageAlt: string; interiorImageAlt: string; explore: string; since: string; stats: [string, string][];
  aboutKicker: string; aboutTitle: string; aboutText: string; fields: [string, string][];
  projectsKicker: string; projectsTitle: string; viewProject: string;
  projects: { name: string; tag: string; description: string; facts: string[]; image: string }[];
  amenityKicker: string; amenityTitle: string; amenities: string[];
  investKicker: string; investTitle: string; investText: string; investPoints: string[];
  ctaTitle: string; ctaText: string; form: string[]; send: string; footer: string;
  formMessage: string; formRequired: string; formInvalidEmail: string; formSending: string;
  formSuccessTitle: string; formSuccessText: string; formErrorText: string; formSendAnother: string; formPhoneCode: string;
};

export const copy: Record<Locale, SiteCopy> = {
  en: {
    skip: 'Skip to content', nav: ['Home', 'About', 'Projects', 'Why Türkiye', 'Contact'], search: 'Search', searchPlaceholder: 'Search projects, amenities, or services…', noResults: 'No matching results found.', contact: 'Talk to our team',
    heroKicker: 'Luxury real estate developer · Istanbul', heroTitle: 'Live beautifully.\nInvest wisely.', heroText: 'Distinctive homes and considered communities, created in Istanbul for modern life and long-term value.', heroImageAlt: 'Istanbul skyline and Bosphorus waterfront at sunset', interiorImageAlt: 'Contemporary luxury residential interior in Istanbul', explore: 'Explore our projects', since: 'Building with purpose since 2014', stats: [['2014', 'Founded in Istanbul'], ['2', 'Signature developments'], ['3', 'Regional partnerships']],
    aboutKicker: 'Who we are', aboutTitle: 'Spaces designed for the way life should feel.', aboutText: 'HADARA is an Istanbul-based developer of luxury villas and high-quality residential projects. Since 2014, we have combined elegant design, sustainable construction, and premium living environments for families and investors, supported by trusted partnerships across Qatar, Kuwait, and Saudi Arabia.', fields: [['01', 'Architectural services'], ['02', 'Residential project development'], ['03', 'Building materials export']],
    projectsKicker: 'Selected developments', projectsTitle: 'A considered approach to place.', viewProject: 'View project', projects: [
      { name: 'Marmara Haven Villa', tag: 'Private villa · Marmara coast', description: 'A private seaside haven on a 637 m² plot, with open views, a private elevator, deep-water well, and full smart-home system.', facts: ['4 floors', '576 m²', '5 bedrooms', '7 bathrooms'], image: '/images/architecture.jpg' },
      { name: 'Beylikdüzü Living', tag: 'New residential project · Istanbul', description: 'A 21,000 m² residential development shaped around modern living, comprehensive social amenities, flexible installments, and delivery at the end of 2028.', facts: ['21,000 m² land', 'Social amenities', 'Flexible payment', 'Delivery 2028'], image: '/images/istanbul.jpg' },
    ],
    amenityKicker: 'Elevated living', amenityTitle: 'Everyday comfort, thoughtfully included.', amenities: ['Residents club', 'Private fitness center', 'Concierge services', 'Valet parking', 'Co-working spaces', 'Rooftop & infinity pool', 'Smart-home integration'],
    investKicker: 'Live & invest in Türkiye', investTitle: 'A home with a wider horizon.', investText: 'Our team supports international buyers through the property journey, from choosing the right home to understanding residence and citizenship pathways linked to qualified real estate investment.', investPoints: ['Property residence guidance', 'Turkish citizenship pathways', 'Local market expertise'],
    ctaTitle: 'Begin your Istanbul property journey.', ctaText: 'Tell us what you are looking for. A HADARA advisor will contact you shortly.', form: ['First name', 'Last name', 'Email address', 'Phone number'], send: 'Request a consultation', footer: 'Luxury real estate development in Istanbul, Türkiye.',
    formMessage: 'Your message', formRequired: 'Please fill in all required fields.', formInvalidEmail: 'Please enter a valid email address.', formSending: 'Sending…',
    formSuccessTitle: 'Thank you for reaching out.', formSuccessText: 'We truly appreciate your interest in HADARA. Your message has been received, and one of our advisors will personally contact you shortly to assist you.', formErrorText: 'Something went wrong while sending your message. Please try again in a moment.', formSendAnother: 'Send another message', formPhoneCode: 'Country code',
  },
  ar: {
    skip: 'انتقل إلى المحتوى', nav: ['الرئيسية', 'من نحن', 'المشاريع', 'لماذا تركيا', 'تواصل معنا'], search: 'بحث', searchPlaceholder: 'ابحث عن مشروع أو خدمة أو ميزة…', noResults: 'لا توجد نتائج مطابقة.', contact: 'تحدث مع فريقنا',
    heroKicker: 'تطوير عقاري فاخر · إسطنبول', heroTitle: 'عِش بجمال.\nواستثمر بحكمة.', heroText: 'منازل استثنائية ومجتمعات مدروسة نصنعها في إسطنبول للحياة العصرية والقيمة طويلة الأمد.', heroImageAlt: 'أفق إسطنبول ومضيق البوسفور وقت الغروب', interiorImageAlt: 'تصميم داخلي فاخر لشقة سكنية عصرية في إسطنبول', explore: 'استكشف مشاريعنا', since: 'نبني بهدف منذ عام 2014', stats: [['2014', 'تأسست في إسطنبول'], ['2', 'مشروعان مميزان'], ['3', 'شراكات إقليمية']],
    aboutKicker: 'من نحن', aboutTitle: 'مساحات مصممة لتمنح الحياة شعورها الحقيقي.', aboutText: 'حضارة مطوّر عقاري مقره إسطنبول، متخصص في الفلل الفاخرة والمشاريع السكنية عالية الجودة. منذ عام 2014، نجمع بين التصميم الأنيق والبناء المستدام وبيئات العيش الراقية للعائلات والمستثمرين.', fields: [['01', 'الخدمات المعمارية'], ['02', 'تطوير المشاريع السكنية'], ['03', 'تصدير مواد البناء']],
    projectsKicker: 'مشاريع مختارة', projectsTitle: 'رؤية مدروسة للمكان.', viewProject: 'عرض المشروع', projects: [
      { name: 'فيلا Marmara Haven', tag: 'فيلا خاصة · ساحل مرمرة', description: 'ملاذ خاص على البحر فوق أرض بمساحة 637 م²، بإطلالات مفتوحة ومصعد خاص وبئر مياه عميق ونظام منزل ذكي متكامل.', facts: ['4 طوابق', '576 م²', '5 غرف نوم', '7 حمامات'], image: '/images/architecture.jpg' },
      { name: 'Beylikdüzü Living', tag: 'مشروع سكني جديد · إسطنبول', description: 'مشروع سكني على مساحة 21,000 م² للحياة العصرية، بمرافق اجتماعية متكاملة وخطط دفع مرنة وتسليم نهاية 2028.', facts: ['أرض 21,000 م²', 'مرافق اجتماعية', 'دفع مرن', 'تسليم 2028'], image: '/images/istanbul.jpg' },
    ],
    amenityKicker: 'حياة أرقى', amenityTitle: 'راحة يومية صُممت بعناية.', amenities: ['نادي السكان', 'مركز لياقة خاص', 'خدمات الكونسيرج', 'خدمة صف السيارات', 'مساحات عمل مشتركة', 'سطح ومسبح إنفينيتي', 'أنظمة المنزل الذكي'],
    investKicker: 'عِش واستثمر في تركيا', investTitle: 'منزل يفتح لك أفقًا أوسع.', investText: 'ندعم المشترين الدوليين في رحلتهم العقارية، من اختيار المنزل المناسب إلى فهم مسارات الإقامة والجنسية المرتبطة بالاستثمار العقاري المؤهل.', investPoints: ['إرشاد الإقامة العقارية', 'مسارات الجنسية التركية', 'خبرة بالسوق المحلي'],
    ctaTitle: 'ابدأ رحلتك العقارية في إسطنبول.', ctaText: 'أخبرنا عمّا تبحث عنه وسيتواصل معك مستشار من حضارة قريبًا.', form: ['الاسم الأول', 'اسم العائلة', 'البريد الإلكتروني', 'رقم الهاتف'], send: 'اطلب استشارة', footer: 'تطوير عقاري فاخر في إسطنبول، تركيا.',
    formMessage: 'رسالتك', formRequired: 'يرجى تعبئة جميع الحقول المطلوبة.', formInvalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.', formSending: 'جارٍ الإرسال…',
    formSuccessTitle: 'شكرًا جزيلاً لتواصلك معنا.', formSuccessText: 'يسعدنا اهتمامك بحضارة للتطوير العقاري. تم استلام رسالتك بنجاح، وسيتواصل معك أحد مستشارينا شخصيًا في أقرب وقت ممكن لمساعدتك.', formErrorText: 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى بعد قليل.', formSendAnother: 'إرسال رسالة أخرى', formPhoneCode: 'مفتاح الدولة',
  },
  tr: {
    skip: 'İçeriğe geç', nav: ['Ana Sayfa', 'Hakkımızda', 'Projeler', 'Neden Türkiye', 'İletişim'], search: 'Ara', searchPlaceholder: 'Proje, olanak veya hizmet arayın…', noResults: 'Eşleşen sonuç bulunamadı.', contact: 'Ekibimizle görüşün',
    heroKicker: 'Lüks gayrimenkul geliştiricisi · İstanbul', heroTitle: 'Güzel yaşayın.\nAkıllıca yatırım yapın.', heroText: 'İstanbul’da modern yaşam ve uzun vadeli değer için tasarlanan seçkin evler ve özenli yaşam alanları.', heroImageAlt: 'Gün batımında İstanbul silüeti ve Boğaz kıyısı', interiorImageAlt: 'İstanbul’da çağdaş lüks konut iç mekânı', explore: 'Projelerimizi keşfedin', since: '2014’ten beri amaçla inşa ediyoruz', stats: [['2014', 'İstanbul’da kuruldu'], ['2', 'Özel proje'], ['3', 'Bölgesel ortaklık']],
    aboutKicker: 'Biz kimiz', aboutTitle: 'Hayatın hissettirmesi gerektiği gibi tasarlanan mekânlar.', aboutText: 'HADARA, İstanbul merkezli lüks villa ve nitelikli konut projeleri geliştiricisidir. 2014’ten bu yana aileler ve yatırımcılar için zarif tasarım, sürdürülebilir yapı ve seçkin yaşam alanlarını bir araya getiriyoruz.', fields: [['01', 'Mimari hizmetler'], ['02', 'Konut projesi geliştirme'], ['03', 'Yapı malzemeleri ihracatı']],
    projectsKicker: 'Seçili projeler', projectsTitle: 'Mekâna özenli bir yaklaşım.', viewProject: 'Projeyi görüntüle', projects: [
      { name: 'Marmara Haven Villa', tag: 'Özel villa · Marmara kıyısı', description: '637 m² arsa üzerinde açık manzaralar, özel asansör, derin su kuyusu ve tam akıllı ev sistemi sunan deniz kenarı villası.', facts: ['4 kat', '576 m²', '5 yatak odası', '7 banyo'], image: '/images/architecture.jpg' },
      { name: 'Beylikdüzü Living', tag: 'Yeni konut projesi · İstanbul', description: 'Modern yaşam, kapsamlı sosyal olanaklar, esnek taksitler ve 2028 sonu teslim planıyla şekillenen 21.000 m² konut projesi.', facts: ['21.000 m² arsa', 'Sosyal olanaklar', 'Esnek ödeme', '2028 teslim'], image: '/images/istanbul.jpg' },
    ],
    amenityKicker: 'Seçkin yaşam', amenityTitle: 'Gündelik konfor, özenle düşünüldü.', amenities: ['Sakinler kulübü', 'Özel fitness merkezi', 'Concierge hizmetleri', 'Vale hizmeti', 'Ortak çalışma alanları', 'Çatı terası ve sonsuzluk havuzu', 'Akıllı ev entegrasyonu'],
    investKicker: 'Türkiye’de yaşayın ve yatırım yapın', investTitle: 'Daha geniş bir ufka açılan ev.', investText: 'Uluslararası alıcılara doğru evi seçmekten oturum ve vatandaşlık yollarını anlamaya kadar gayrimenkul yolculuğunda destek oluyoruz.', investPoints: ['Gayrimenkul oturum rehberliği', 'Türk vatandaşlığı yolları', 'Yerel pazar uzmanlığı'],
    ctaTitle: 'İstanbul’daki gayrimenkul yolculuğunuza başlayın.', ctaText: 'Aradığınız evi bize anlatın. HADARA danışmanı kısa süre içinde sizinle iletişime geçsin.', form: ['Ad', 'Soyad', 'E-posta adresi', 'Telefon numarası'], send: 'Danışmanlık talep edin', footer: 'İstanbul, Türkiye’de lüks gayrimenkul geliştirme.',
    formMessage: 'Mesajınız', formRequired: 'Lütfen tüm gerekli alanları doldurun.', formInvalidEmail: 'Lütfen geçerli bir e-posta adresi girin.', formSending: 'Gönderiliyor…',
    formSuccessTitle: 'Bize ulaştığınız için teşekkür ederiz.', formSuccessText: 'HADARA’ya gösterdiğiniz ilgi için minnettarız. Mesajınız alındı; danışmanlarımızdan biri size yardımcı olmak üzere kısa süre içinde şahsen sizinle iletişime geçecek.', formErrorText: 'Mesajınız gönderilirken bir sorun oluştu. Lütfen kısa bir süre sonra tekrar deneyin.', formSendAnother: 'Başka bir mesaj gönder', formPhoneCode: 'Ülke kodu',
  },
};
