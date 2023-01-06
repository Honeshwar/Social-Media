function noty(flashMessage){
        new Noty({
            theme:'metroui',
            text:`${flashMessage.success}`,
            type:"success",
            layout:'topRight',
            timeout:1500
        }).show();
    
}

module.exports = noty;