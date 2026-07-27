/*!
 * favicon.js — Single-source-of-truth favicon injector for this site.
 *
 * Why this file exists:
 *   The site has several favicon variants (32x32, full logo, apple-touch)
 *   living in the project root. Without this script, every new HTML page
 *   needs the same set of <link rel="icon"> tags hand-written into its
 *   <head>, with paths adjusted for the page's depth. That's easy to
 *   forget, and the version query string (?v=N) has to be bumped in
 *   every file when an icon is updated.
 *
 *   This script solves that by:
 *     1. Detecting its own URL via document.currentScript.
 *     2. Computing the base path of the favicon images (which live in
 *        the same directory as this script) from that URL.
 *     3. Injecting all the <link> tags into <head> at runtime.
 *
 *   So a new page only needs ONE line in its <head>:
 *
 *     At the project root:        <script src="favicon.js"></script>
 *     In /sub/:                   <script src="../favicon.js"></script>
 *     In /a/b/:                   <script src="../../favicon.js"></script>
 *     (Use enough "../" segments to climb back to this file at the root.)
 *
 * To bust browser caches after replacing any favicon image, bump VERSION
 * below to the next integer. You only ever have to change it here.
 */
(function () {
  'use strict';

  // Bump this whenever a favicon image is replaced.
  var VERSION = '?v=4';

  // 1. Figure out where this script was loaded from.
  var script = document.currentScript;
  if (!script || !script.src) {
    // No way to resolve paths; bail silently rather than break the page.
    return;
  }

  // script.src looks like "https://example.com/booking/favicon.js"
  // basePath becomes "https://example.com/booking/" — i.e. the directory
  // this script lives in, which is also where the favicon images live.
  var basePath = script.src.substring(0, script.src.lastIndexOf('/') + 1);

  // 2. Get the document <head>. (If we're somehow called before <head>
  //    exists, just skip — the page is broken in other ways too.)
  var head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;

  // 3. Helper to append a <link> element.
  function addLink(rel, type, sizes, href) {
    var link = document.createElement('link');
    link.rel = rel;
    if (type)  link.type  = type;
    if (sizes) link.sizes = sizes;
    link.href = href;
    head.appendChild(link);
  }

  // 4. The full set of favicon variants, mirroring what the static site
  //    originally had: 32x32 PNG, full logo as a scalable icon, an IE-era
  //    shortcut icon, and the 180x180 Apple touch icon.
  addLink('icon',          'image/png', '32x32',   basePath + 'favicon-32.png' + VERSION);
  addLink('icon',          'image/png', 'any',     basePath + 'ai-tools-assessment-logo.png' + VERSION);
  addLink('shortcut icon', 'image/png', null,      basePath + 'favicon-32.png' + VERSION);
  addLink('apple-touch-icon', null,     '180x180', basePath + 'apple-touch-icon.png' + VERSION);
})();
