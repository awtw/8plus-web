export function LocaleScript() {
  const script = `
(function () {
  try {
    var locale = window.localStorage.getItem('locale');
    if (locale === 'en') {
      document.documentElement.lang = 'en';
    } else if (locale === 'zh-TW') {
      document.documentElement.lang = 'zh-Hant';
    }
  } catch (e) {}
})();`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
