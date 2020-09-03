function objectToXml(obj) {
  const stringXml = `<?xml version='1.0' encoding='UTF-8'?><produto><descricao>${obj["opportunity"]}</descricao><vlr_unit>${obj["value"]}</vlr_unit><dataValidade>${obj["date"]}</dataValidade></produto>`;
  return stringXml;
}

export default objectToXml;
