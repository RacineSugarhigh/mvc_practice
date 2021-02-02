/* ------------- Model ---------------- */
const Model = (function()
{
    let myData = [];

    /**
     * 初期化：初期値を設定
     */
    let init = () => update("cmd_init");

    /**
     * データの更新処理
     * @param {String} cmd 更新の種類を表すコマンド
     */
    let update = cmd =>//modelの責務 : データ更新
    {
        switch(cmd)
        {
            case "cmd_init":
                myData.push("test app start");  
                $(window).trigger("init");//Model更新通知
                break;

            case "cmd_click":
                let date = new Date();
                let newData = date.toString();
                myData.push(newData);
                $(window).trigger("update");//Model更新通知
                break;
        }  
    }

    /**
     * データのゲッター ※参照用だが、変更しようとおもったらできてしまう
     * @returns データ
     */
    let getData = () => myData;

    return {
        init : init,
        update : update,
        getData : getData
    };
})();


/* ------------- View ----------------- */
const View = (function()
{
    /**
     * 初期化：イベントの登録
     */
    let init = () =>  setEvent();

    /**
     * UIの描画処理
     * @param {array} data 描画用データ
     */
    let render = data => // viewの責務：UIの更新(本当は多層化しないと毎回すべて更新になってしまうので注意)
    {
        let html = "";
        for(let i in data)
        {
            html += data[i] + "<br>";
        }
        $(".main_content").html(html);
    };

    /**
     * UI更新処理
     */
    let update = () =>
    {   
        let data = Model.getData(); //model参照
        render(data);               //UI更新
    };

    /**
     * イベント登録処理
     */
    let setEvent = () =>
    {
        $(window).on("update", update);
        $(window).on("init", update);

    };

    return {
        init : init,
        update : update
    };
})();


/* ------------- Controller ------------ */
const Controller = (function()
{
    /**
     * 初期化：イベントの登録
     */
    let init = () => setEvent();

    /**
     * ボタンが押された時の処理
     */
    let onClickBtn = () =>
    {
        Model.update("cmd_click");   //Controllerの責務：modelにユーザアクションを通知
    }

    /**
     * イベントの登録処理
     */
    let setEvent = () =>
    {
        $(".evtBtn").click(onClickBtn);
    }

    return {
        init : init
    }

})();



/**
 * メイン処理
 */
function main()
{
    View.init();
    Controller.init();
    Model.init();
}




//実行
main();





