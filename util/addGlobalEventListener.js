/** Creates a new global event listener, this is an event listener at the document level.
 *
 * @param {string} type - The type of DOM event to be listened to.
 * @param {string} selector - The DOM selector of the element that will trigger the callback.
 * @param {function} callback - The callback function that will executed in response of the event.
 */
export default function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e)
    }
  })
}
