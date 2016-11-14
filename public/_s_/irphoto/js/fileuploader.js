/*
 * Объект-загрузчик файла на сервер.
 * Передаваемые параметры:
 * file       - объект File (обязателен)
 * url        - строка, указывает куда загружать (обязателен)
 * fieldName  - имя поля, содержащего файл (как если задать атрибут name тегу input)
 * onprogress - функция обратного вызова, вызывается при обновлении данных
 *              о процессе загрузки, принимает один параметр: состояние загрузки (в процентах)
 * oncopmlete - функция обратного вызова, вызывается при завершении загрузки, принимает два параметра:
 *              uploaded - содержит true, в случае успеха и false, если возникли какие-либо ошибки;
 *              data - в случае успеха в него передается ответ сервера
 *              
 *              если в процессе загрузки возникли ошибки, то в свойство lastError объекта помещается
 *              объект ошибки, содержащий два поля: code и text
 */

var uploaderObject = function(params) {

    if(!params.file || !params.url) {
        return false;
    }

    this.xhr = new XMLHttpRequest();
    this.reader = new FileReader();

    this.progress = 0;
    this.uploaded = false;
    this.successful = false;
    this.lastError = false;
    this.sessionid = 0;
    this.csrftoken = 0;
    
    var self = this;    

    self.reader.onload = function() {
        self.xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                self.progress = (e.loaded * 100) / e.total;
                if(params.onprogress instanceof Function) {
                    params.onprogress.call(self, Math.round(self.progress));
                }
            }
        }, false);

        self.xhr.upload.addEventListener("load", function(){
            self.progress = 100;
            self.uploaded = true;
        }, false);

        self.xhr.upload.addEventListener("error", function(){            
            self.lastError = {
                code: 1,
                text: 'Error uploading on server'
            };
        }, false);

        self.xhr.onreadystatechange = function () {
            var callbackDefined = params.oncomplete instanceof Function;
            if (this.readyState == 4) {
                if(this.status == 200) {
                	if(this.responseText) {
                		self.successful = this.responseText;
                		params.onsuccesful.call(self);
                	}
                } else {
                    self.lastError = {
                        code: this.status,
                        text: 'HTTP response code is not OK ('+this.status+')'
                    };
	                if(callbackDefined) {
	            		params.oncomplete.call(self, false);
	            	}
                }
            }
        };

        self.xhr.open("POST", params.url, true);
		self.xhr.setRequestHeader ("X-File-Name" , params.gall_name+"_"+params.file.name );
        /*var boundary = "multipartformboundary1295790618";
        self.xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=------"+boundary);
        self.xhr.setRequestHeader("Cache-Control", "no-cache");
        

		//var body = "Content-Type: multipart/form-data; boundary=------"+boundary+"\r\n";
        var body = "------" + boundary + "\r\n";
        body += "Content-Disposition: form-data; name='"+(params.fieldName || 'file')+"'; filename='" + params.file.name + "'\r\n";
        body += "Content-Type: application/octet-stream\r\n\r\n";
        body += self.reader.result + "\r\n";
        body += "------" + boundary + "--";*/
       var body = params.file;
        if(self.xhr.sendAsBinary) {
            // firefox
            try{
            	self.xhr.sendAsBinary(body.getAsBinary());
            }
            catch(err){
            	self.xhr.send(body);
            }
        } else {
            // chrome (W3C spec.)
            self.xhr.send(body);
        }
       /*$.ajax({
        type: "POST",
        url: "/irphoto/upload/",
        data: "image="+params.file,
       });*/
        //$.post("/irphoto/upload/", { img: params.file }, function(data){});
    };

    self.reader.readAsBinaryString(params.file);
};
