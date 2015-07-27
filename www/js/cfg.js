var IAPI = function(){

	var $ionicLoading = null;
	var $http         = null;
	var $timeout      = null;
    var MySQLite      = null;
    var MyDB          = null;

	var myNotice = function(msg, timeout, prev, post){
   		$ionicLoading.show({template:msg});
	    $timeout(function(){prev && prev();$ionicLoading.hide();post && post();}, timeout || 1000);
	    return false;
	}
	var createDB = function(){

		MyDB = MySQLite.openDB("IonicAPI.db");

        MySQLite.execute(MyDB, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        //MySQLite.execute(MyDB, "CREATE TABLE IF NOT EXISTS user_xy (id integer primary key, lng text,lat text, address text)");
    
	}

	var insertPeople = function(firstname,lastname){
		var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        MySQLite.execute(MyDB, query, [firstname, lastname]).then(function(res) {
           //console.log("INSERT ID -> " + res.insertId);
            myNotice("录入成功：id:"+res.insertId,2000);
        }, function (err) {
            console.error(err);
            myNotice("error"+err);
        });
	}

	var query = function(query,data,callback){
		if(!MyDB){
			myNotice('数据库初始化失败');
			return;
		}
		MySQLite.execute(MyDB, query, data).then(function(res) {
            callback(res);
        }, function (err) {
            myNotice("error"+err);
        });
	}

 	var isOnline = function(){
 		return navigator && navigator.connection && navigator.connection.type!=Connection.NONE;
 	};
  
	var setMyIonicLoading = function(obj){$ionicLoading = obj;}
    var setMyHttp         = function(obj){$http         = obj;}
    var setMyTimeout      = function(obj){$timeout      = obj;}
    
    var getMySQLite = function(){return MySQLite;}
    var setMySQLite = function(conn){MySQLite = conn;}

	var iapi = {};

	iapi.createDB = createDB;
	iapi.insertPeople = insertPeople;
	iapi.query = query;
	iapi.myNotice = myNotice;
	iapi.setMyIonicLoading  = setMyIonicLoading;
	iapi.setMyHttp          = setMyHttp;
	iapi.setMyTimeout     = setMyTimeout;
    
	iapi.isOnline = isOnline;

	iapi.getMySQLite = getMySQLite;
    iapi.setMySQLite = setMySQLite;


	return iapi;
}();