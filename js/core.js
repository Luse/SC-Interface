      var deviceID    = "55ff6e065075555355371887";
      var accessToken = "ae6a48ce15b8fd8bad9676b05d64ca4334c980b2";
      var setFunc = "setpos";
      var getFunc = "getpos";


      function fullCheck(ledn,newValue) {
        var paramStr = "l" + ledn.toString();
        if (newValue==1) { 
           paramStr = paramStr + ",HIGH";
        } else {
          paramStr = paramStr + ",LOW";
        }

        
	var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + "beep" + "/";
        $.post( requestURL, { params: paramStr, access_token: accessToken });
      }

      window.setInterval(function() {
        requestURL = "https://api.spark.io/v1/devices/" + deviceID + "/" + getFunc + "/?access_token=" + accessToken;
        $.getJSON(requestURL, function(json) {
                 document.getElementById("curPos").innerHTML = json.result + "&deg;";
                 document.getElementById("curPos").style.fontSize = "28px";
                 document.getElementById("degBoxId").value = parseInt(json.result);
                 });
      }, 1000);

      function setValue(obj) {
        var newValue = document.getElementById('degBoxId').value;
        sparkSetPos(newValue);
      }

      function fineAdjust(value) {
        var currentValue = parseInt(document.getElementById('curPos').innerHTML);
        var setValue = value + currentValue;
        sparkSetPos(setValue);
        document.getElementById("degBoxId").value = setValue;
      }

      function sparkSetPos(newValue) {
  var requestURL = "https://api.spark.io/v1/devices/" +deviceID + "/" + setFunc + "/";
        $.post( requestURL, { params: newValue, access_token: accessToken });
      }