module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const notificationNumberElem = document.querySelector(
      'svg[aria-label="Direct"] + div div div',
    );
    let count = 0;
    if (notificationNumberElem) {
      count = parseInt(notificationNumberElem.textContent, 10);
    }

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);

  /* Enable desktop notifications in insta settings */
  localStorage.setItem('ig_notifications_dismiss', 0);

  if (typeof Franz.onNotify === 'function') {
    Franz.onNotify((notification) => {
      if (typeof notification.title !== 'string') {
        notification.title =
          ((notification.title.props || {}).content || [])[0] || 'Instagram';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body =
          (((notification.options.body || {}).props || {}).content || [])[0] ||
          '';
      }

      return notification;
    });
  }
};
