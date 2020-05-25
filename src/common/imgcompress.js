function dataURItoBlob(dataURI, type) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: type });
}
function beforeAvatarUpload(file) {
    const _this = this
    return new Promise(resolve => {
      const reader = new FileReader()
      const image = new Image()
      image.onload = (imageEvent) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const width = image.width * _this.imgQuality
        const height = image.height * _this.imgQuality
        canvas.width = width;
        canvas.height = height;
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(file.type);
        const blobData = _this.dataURItoBlob(dataUrl, file.type);
        resolve(blobData)
      }
      reader.onload = (e => { image.src = e.target.result; });
      reader.readAsDataURL(file);
    })
  }
  export {beforeAvatarUpload}
