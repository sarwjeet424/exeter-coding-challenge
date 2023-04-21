const fs= require('fs')
const process = require('process')

const getFile= function (req,res){
   try{
    let start= Date.now()

    let shakespeareWords = fs.readFileSync('t8.shakespeare.txt').toString();
    shakespeareWords=shakespeareWords.trim().split('\n').join(' ').split(' ')
    // console.log(shakespeareWords)

    let englishWordsList = fs.readFileSync('find_words.txt').toString();
    englishWordsList=englishWordsList.trim().split('\n').join(' ').split(' ')
    // console.log(englishWordsList)

    let englishFrenchWords = fs.readFileSync('french_dictionary.csv').toString();
    englishFrenchWords=englishFrenchWords.trim().split('\n').join('@').split('@')
    let englishFrenchList={}
      for(let i of englishFrenchWords){
        let data= i.split(',')
        englishFrenchList[data[0]]=data[1]
      }
    // console.log(englishFrenchList)

    let listOfPresentedWords={}
    for(let i=0;i<shakespeareWords.length;i++){
      if(englishFrenchList[shakespeareWords[i]] && !listOfPresentedWords[shakespeareWords[i]]){ 
        listOfPresentedWords[shakespeareWords[i]]=1,
        shakespeareWords[i]=englishFrenchList[shakespeareWords[i]]
      }
      else if(englishFrenchList[shakespeareWords[i]] && listOfPresentedWords[shakespeareWords[i]]){ 
        listOfPresentedWords[shakespeareWords[i]]=listOfPresentedWords[shakespeareWords[i]]+1,
        shakespeareWords[i]=englishFrenchList[shakespeareWords[i]]
      }
    }
    shakespeareWords= shakespeareWords
    // console.log(shakespeareWords)                // contain t8.shakespeare.txt data with updated french words
    
    let presentEngWords = Object.keys(listOfPresentedWords)
    let updatedWords = presentEngWords.join('\n')

    let presentEngFreq = Object.values(listOfPresentedWords)

    let frequencyData = [['English word','French word','Frequency']];
    for(let i=0;i<presentEngWords.length;i++){
      frequencyData.push([presentEngWords[i],englishFrenchList[presentEngWords[i]],presentEngFreq[i]])
    }
   
    const frequencyList = frequencyData.map(row => row.join(',')).join('\n');

    let gitHubLink = 'https://github.com/sarwjeet424/exeter-coding-challenge';

    fs.writeFileSync('frequency.csv', frequencyList);
    fs.writeFileSync('t8.shakespeare.translated.txt', updatedWords);
    fs.writeFileSync('githublink.txt',gitHubLink);

    for (const [key,value] of Object.entries(process.memoryUsage())){
       var totalMemoryUsage =  "Memory used: "+value/1000000+" MB"
       break;
    }
   
    let end= Date.now()
    var totalTimeTaken = end - start 
 
    var  totalSeconds = Math.floor(totalTimeTaken / 1000); // Convert milliseconds to seconds
    var minutes = Math.floor(totalSeconds / 60); // Extract the number of whole minutes
    var seconds = totalSeconds % 60; // Extract the remaining seconds
    let totalTimeOfExecution = `Time to process: ${minutes} minutes ${seconds} seconds`
           
    let performanceArr = []
    performanceArr.push(totalTimeOfExecution)
    performanceArr.push(totalMemoryUsage)
    performanceArr= performanceArr.join('\n')
    fs.writeFileSync('performance.txt', performanceArr);

         
    return res.status(200).send({status:true,message:'successfull'})

   }catch(err){
    return res.status(500).send({status:false,message:err.message})
   }
}


module.exports = {getFile}
