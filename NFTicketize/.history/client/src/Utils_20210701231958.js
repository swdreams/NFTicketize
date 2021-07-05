

module.exports = {
    ButtonsFlags: function (domainData, primaryType, message, types) {
      return {
        types: Object.assign({
          EIP712Domain: DOMAIN_TYPE,
        }, types),
        domain: domainData,
        primaryType: primaryType,
        message: message
      };
    },
}