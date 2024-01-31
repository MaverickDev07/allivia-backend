

export const dateTimeNowInitDay = () => {
    const now=new Date();



    let dateStr=now.getFullYear().toString();
    let month=now.getMonth()+1;
    

    if(month<10){
        dateStr+="-0"+month;
    }else{
        dateStr+="-"+month;
    }

    if(now.getDate()<10){
        dateStr+="-0"+now.getDate();
    }else{
        dateStr+="-"+now.getDate();
    }

    dateStr+=" 00:00:00";
    console.log(dateStr);
    return dateStr;
}