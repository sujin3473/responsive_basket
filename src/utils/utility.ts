//숫자 세자리 마다 콤마를 추가한 문자열 리턴
export const commafy = (num: number): string => {
  const str: string[] = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  return str.join(',');
};
