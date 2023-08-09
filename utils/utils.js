function getContentTypeFromExt(ext) {
  switch (ext) {
    case "bin":
      return "application/octet-stream";
      break;
    case "bmp":
      return "image/bmp";
      break;
    case "doc":
      return "application/msword";
      break;
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      break;
    case "epub":
      return "application/epub+zip";
      break;
    case "gif":
      return "image/gif";
      break;
    case "jpg":
    case "jpeg":
      return "image/jpeg";
      break;
    case "png":
      return "image/jpeg";
      break;
    case "pdf":
      return "application/pdf";
      break;
    case "txt":
      return "text/plain";
      break;
    default:
      return "";
      break;
  }
}

module.exports = getContentTypeFromExt;
