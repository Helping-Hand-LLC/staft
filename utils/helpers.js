module.exports = {
  checkConfirmedParticipant: (workerId, list) => {
    for (let i = 0; i < list.length; i++) {
      if (workerId == list[i].worker) return true;
    }
    return false;
  }
};
