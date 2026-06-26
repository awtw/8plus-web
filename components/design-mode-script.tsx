export function DesignModeScript() {
  const script = `
(function () {
  try {
    var modes = ['cohere', 'apple', 'elevenlabs'];
    var map = { classic: 'cohere', paper: 'apple', studio: 'elevenlabs', cohere: 'cohere', apple: 'apple', elevenlabs: 'elevenlabs' };
    var params = new URLSearchParams(window.location.search);
    var query = params.get('theme') || params.get('design') || params.get('view');
    var stored = window.localStorage.getItem('8plus-design-mode');
    var mode = (query && map[query]) || (stored && modes.indexOf(stored) !== -1 ? stored : null) || 'cohere';
    document.documentElement.dataset.designMode = mode;
  } catch (e) {}
})();`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
