/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Alexa Chennai Meetup!. '
        +'Currently i can recommand you places to visit in town.'
        +'To continue please tell me your name?';
    const repromptText = 'To continue please tell me your name?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const WelcomeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WelcomeIntent';
  },
  handle(handlerInput) {
    let name = handlerInput.requestEnvelope.request.intent.slots.name.value;
    let zone = handlerInput.requestEnvelope.request.intent.slots.zone.value;
    
    if(!name && !zone){
      return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse();
    } else if (name && !zone){
      const speechText = `Hey ${name}, good to meet you. which part of Chennai you stay in?`;
      const repromptText = 'which part of Chennai you stay in? Tell me if its North, South, East or West';
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse();
    } else {
      let speechText;
      if(zone == 'north'){
        speechText = 'I recommend Marina beach. Its longest beach in India and it is one of the pride of Chennai';
      } else if (zone == 'south'){
        speechText = 'Hmm. Adyar is one of the best place. Banyan tree which is located in Adyar is in middle of Theosophical Society Campus.  It is around 450 years old and estimated to be the second largest banyan tree in India';
      } else if (zone == 'east'){
        speechText = 'East Coast Road is one of the main attraction. Some of the places in and around ECR are Muttukadu boat house, dakshin chitra and Mahabalipuram';
      } else {
        speechText = 'I suggest you to visit Anna Nagar Tower Park. This park is around 16 acres and was was built in 1968 as part of the World Trade Fair.';
      }
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'To continue please tell me your name?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Hope you liked the information. Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    WelcomeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
