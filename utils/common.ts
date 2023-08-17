import { ElNotification } from "element-plus";
type Message = "success" | "warning" | "error" | "info";
export const showMessage  = (type: Message, message: string) => {
  if (type === "success") {
    ElNotification.success({
      title: "Success",
      message,
    });
  } else if (type === "warning") {
    ElNotification.warning({
      title: "Success",
      message,
    });
  } else if (type === "error") {
    ElNotification.error({
      title: "Error",
      message,
    });
  } else
    ElNotification.info({
      title: "Info",
      message,
    });
};
export const clearCookies = () => {
  var cookies = document.cookie.split("; ");
  for (var c = 0; c < cookies.length; c++) {
    var cookieName = cookies[c].split("=")[0];
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
