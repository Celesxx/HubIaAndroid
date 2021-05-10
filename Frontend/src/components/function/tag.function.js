import * as service from "../../services/tag.service";

export let record = (obj, webcamRef) =>
{
    try 
      {
        
          if(obj[0].score > 0.90 )
          {
              let img = webcamRef.current.getScreenshot()
              let data = 
              {
                name : obj[0].class,
                box : 
                {
                  minX: obj[0].bbox[0], 
                  minY: obj[0].bbox[1],
                  maxX: obj[0].bbox[2],
                  maxY: obj[0].bbox[3]
                },
                score : obj[0].score,
                image : img
              }
              service.postTag(data)
              console.log(data)
          }
      } catch (error) 
      {
        console.log(`une erreur est survenue lors de l'enregistrement de la détection avec le message : ${error}`)
      }
}