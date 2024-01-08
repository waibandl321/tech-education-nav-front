import {
  LocalizationProvider,
  DatePicker,
  DateView,
  DateValidationError,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useMemo, useState } from "react";

interface DateRangePickerProps {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  nameStart: string;
  nameEnd: string;
  pickerType?: readonly DateView[] | undefined;
  handlerChange: (dateValue: dayjs.Dayjs | null, key: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  nameStart,
  nameEnd,
  pickerType,
  handlerChange,
}: DateRangePickerProps) {
  const [startError, setStartError] = useState<DateValidationError | null>(
    null
  );
  const [endError, setEndError] = useState<DateValidationError | null>(null);

  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case "maxDate":
      case "minDate": {
        return "選択した日付が間違っています";
      }
      case "invalidDate": {
        return "開始月を選択してください";
      }
      default: {
        return "";
      }
    }
  }, [startError]);

  const endErrorMessage = useMemo(() => {
    switch (endError) {
      case "maxDate":
      case "minDate": {
        return "選択した日付が間違っています";
      }
      case "invalidDate": {
        return "終了月を選択してください";
      }
      default: {
        return "";
      }
    }
  }, [endError]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DatePicker
        name={nameStart}
        label="受講開始月"
        value={dayjs(startDate)}
        onChange={(newValue) => handlerChange(newValue, nameStart)}
        format="YYYY年MM月"
        views={pickerType}
        maxDate={dayjs()}
        onError={(newError) => setStartError(newError)}
        slotProps={{
          textField: {
            helperText: startErrorMessage,
          },
        }}
      />
      <DatePicker
        sx={{ ml: 2 }}
        name={nameEnd}
        label="受講終了月"
        value={dayjs(endDate)}
        onChange={(newValue) => handlerChange(newValue, nameEnd)}
        format="YYYY年MM月"
        views={pickerType}
        maxDate={dayjs()}
        minDate={startDate}
        onError={(newError) => setEndError(newError)}
        slotProps={{
          textField: {
            helperText: endErrorMessage,
          },
        }}
      />
    </LocalizationProvider>
  );
}
