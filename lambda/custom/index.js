/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Alexa Bangalore Meetup!. I am your work in-progress skill. '
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
      const speechText = `Hey ${name}, good to meet you. which part of bangalore you stay in?`;
      const repromptText = 'which part of bangalore you stay in? Tell me if its North, South, East or West';
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse();
    } else {
      let speechText;
      if(zone == 'north'){
        speechText = 'i recommand Nandi Hills. Its a wonderful place for a short road trip with your loved ones';
      } else if (zone == 'south'){
        speechText = 'Hmm. South Bangalore is know for temples and tasty food. Try the Basavanagudo temples and tasty dosa @ Vidyarthi Bhavan';
      } else if (zone == 'east'){
        speechText = 'East bangalore is known for its larvish malls and multiplexs. Please try the Phoenix market city mall';
      } else {
        speechText = 'i suggest you to visit the 400 years old Big Banyan tree. The single plant covers over 3 acres of land and is one of the largest of its kinds';
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
