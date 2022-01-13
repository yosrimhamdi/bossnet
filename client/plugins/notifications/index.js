import Notifications from "./Notifications";
import Vue from "vue";
import notificationsByRef from "./notificationsByRef";

const notificationsPlugin = {
  install(Vue, options = { defaultHideDuration: 4000, defaultAutoHide: true }) {
    Vue.component("notifications", Notifications);

    Vue.prototype.$notifications = Vue.observable({ list: [] });

    Vue.prototype.$removeAllNotifications = () =>
      (Vue.prototype.$notifications = Vue.observable({ list: [] }));

    Vue.prototype.$closeNotification = (id) => {
      Vue.prototype.$notifications.list =
        Vue.prototype.$notifications.list.filter((item) => item.id != id);
    };

    Vue.prototype.$notify = ({
      messageRef,
      type,
      title,
      content,
      autoHide = options.defaultAutoHide,
      hideDuration = options.defaultHideDuration,
      deleteOldNotifications = false,
    }) => {
      const id = Math.random();
      let notification;
      if (type && title) {
        notification = { id, type, title, content };
      } else if (messageRef && notificationsByRef[messageRef]) {
        notification = { id, ...notificationsByRef[messageRef] };
      } else {
        notification = { id, ...notificationsByRef.UNEXPECTED_ERROR };
      }
      if (deleteOldNotifications) {
        Vue.prototype.$notifications.list = [notification];
      } else {
        Vue.prototype.$notifications.list.unshift(notification);
      }
      if (autoHide) {
        // remove when duration done
        setTimeout(() => {
          Vue.prototype.$closeNotification(id);
        }, hideDuration);
      }
      return id;
    };
  },
};

Vue.use(notificationsPlugin);
export default (context, inject) => {
  inject("notify", Vue.prototype.$notify);
};
