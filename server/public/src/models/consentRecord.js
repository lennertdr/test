export class ConsentRecord {
    constructor(id, termsIdentifier, consentStatus, dataController, dataProcessor, dataSubject, involvementControl, jurisdiction, notice, process, right) {
      this.id = id;
      this.termsIdentifier = termsIdentifier;
      this.consentStatus = consentStatus;
      this.dataController = dataController;
      this.dataProcessor = dataProcessor;
      this.dataSubject = dataSubject;
      this.involvementControl = involvementControl;
      this.jurisdiction = jurisdiction;
      this.notice = notice;
      this.process = process;
      this.right = right;
    }
  }
  
export class ConsentNotice {
  constructor(id, type, startDate, endDate, language) {
    this.id = id;
    this.type = type
    this.startDate = startDate;
    this.endDate = endDate;
    this.language = language;
  }
}

export class ConsentStatus {
  constructor(type, indicationMethod, indicatedAtTime, indicatedBy) {
    this.type = type;
    this.indicationMethod = indicationMethod;
    this.indicatedAtTime = indicatedAtTime;
    this.indicatedBy = indicatedBy;
  }
}

export class ConsentProcess {
  constructor(personalData, purpose, storageConditions, recipient, necessity) {
      this.personalData = personalData;
      this.purpose = purpose;
      this.storageConditions = storageConditions;
      this.recipient = recipient;
      this.necessity = necessity;
  }
}

/// An item with a prefixed name like 'pd:EmailAddress', with 'Email Address' as its readable name
export class LabelledItem {
  constructor(prefixed, readable, description){
    this.prefixed = prefixed;
    this.readable = readable;
    this.description = description;
  }
}

export class PersonalData {
  constructor(rawLabel, readableLabel, value, description, necessity, dataSource, category) {
    this.rawLabel = rawLabel;
    this.readableLabel = readableLabel;
    this.value = value;
    this.description = description;
    this.necessity = necessity;
    this.dataSource = dataSource;
    this.category = category;
  }
}

export class StorageCondition {
  constructor(type, duration){
    this.type = type;
    this.duration = duration;
  }
}

export class ConditionDuration {
  constructor(value, type) {
    this.value = value,
    this.type = type
  }
}
