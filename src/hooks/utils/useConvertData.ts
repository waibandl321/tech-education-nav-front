export const ensureString = (input: string | string[]): string => {
  if (Array.isArray(input)) {
    // 配列の場合、要素を連結
    return input.join(""); // ここでの区切り文字は任意
  }
  // 文字列の場合、そのまま返す
  return input;
};

// 年齢を算出
export function calculateAge(
  birthYear: number,
  birthMonth: number,
  birthDate: number
): number {
  // 現在の日付を取得
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() は 0 から始まるため、1 を加える
  const currentDay = currentDate.getDate();

  // 年齢の計算
  let age = currentYear - birthYear;

  // 今年の誕生日がまだ来ていない場合、年齢から1を引く
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDate)
  ) {
    age--;
  }

  return age;
}
