function sendMessageOnClick()
{
    document.getElementById("sendMessageButton").disabled = true;
    sendMessage( function(responseMessage)
        {

            if(responseMessage == "Successfully sent message!")
            {
                alert(responseMessage);
                location.reload();
            }else
            {
                alert(responseMessage);
                document.getElementById("sendMessageButton").disabled = false;
            }
        });

}


function sendMessage(callBack = null)
{

    let params = {
        "organization": "MantisDesigns",
        "token": "ad36fb99143de9da6bddd30e3b5e737a3142724c14959c8c5dcd6b208845379c",
        "name" : document.getElementById("clientName").value,
        "reason" : "",
        "email" : document.getElementById("clientEmail").value,
        "message": document.getElementById("clientMessage").value
    };
    
    endpointCall("sendMessage", params, function(data)
                                {
                                    if(data["status"] == "success")
                                    {
                                        callBack('Successfully sent message!');
                                    }else if(data["status"] == "failed")
                                    {
                                        callBack("Failed to send message. Please try again!");
                                    }
                                });
}


var ERROR_FLAG = "ERROR";

var sendMessageEndPoint = "https://www.api-contact-lite.com/sendMessage";

function endpointCall(endpoint=null, params={}, callBack=null)
{
    let endpointLink = identifyEndPoint(endpoint);
    const Http = new XMLHttpRequest();
    var params = JSON.stringify(params);
    Http.open( "POST", endpointLink );
    Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    Http.send(params);
    Http.onreadystatechange = ( e ) => 
    {
        //If the request was successful then populate everything
        if (Http.readyState == 4 && Http.status == 200) 
        {
            //parse the response from power automate to make it readable for the functions
            callBack(JSON.parse( Http.responseText ));
            
        }else
        {
            callBack(ERROR_FLAG);
        }
    }
}

function identifyEndPoint(endpoint=null)
{
    switch(endpoint)
    {
        case "sendMessage":
            return sendMessageEndPoint;
    }
}