function logout(){
    let selected = confirm("Bạn Có Muốn Thoát!!!");
    if(selected){
        localStorage.removeItem("tokenAC");
        window.location.href = "../index.html";
    }
}