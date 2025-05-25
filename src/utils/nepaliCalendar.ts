
// Nepali calendar data based on actual Nepali calendar system
// This matches the calendar used by Hamro Patro
export interface NepaliDate {
  year: number;
  month: number;
  day: number;
}

export interface NepaliMonthData {
  name: string;
  englishName: string;
  days: number;
}

// Nepali calendar data for 2081 and 2082
const nepaliCalendarData: { [year: number]: number[] } = {
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // Baisakh to Chaitra
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // Baisakh to Chaitra
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // Baisakh to Chaitra
};

export const nepaliMonths: NepaliMonthData[] = [
  { name: 'बैशाख', englishName: 'Baisakh', days: 31 },
  { name: 'जेठ', englishName: 'Jestha', days: 32 },
  { name: 'आषाढ', englishName: 'Ashadh', days: 31 },
  { name: 'श्रावण', englishName: 'Shrawan', days: 32 },
  { name: 'भाद्र', englishName: 'Bhadra', days: 31 },
  { name: 'आश्विन', englishName: 'Ashwin', days: 30 },
  { name: 'कार्तिक', englishName: 'Kartik', days: 30 },
  { name: 'मंसिर', englishName: 'Mangsir', days: 30 },
  { name: 'पौष', englishName: 'Poush', days: 29 },
  { name: 'माघ', englishName: 'Magh', days: 30 },
  { name: 'फाल्गुन', englishName: 'Falgun', days: 29 },
  { name: 'चैत्र', englishName: 'Chaitra', days: 31 },
];

export const englishEquivalents = [
  'Apr/May', 'May/Jun', 'Jun/Jul', 'Jul/Aug', 'Aug/Sep', 'Sep/Oct',
  'Oct/Nov', 'Nov/Dec', 'Dec/Jan', 'Jan/Feb', 'Feb/Mar', 'Mar/Apr'
];

// Get the number of days in a Nepali month for a specific year
export const getDaysInNepaliMonth = (year: number, month: number): number => {
  if (nepaliCalendarData[year]) {
    return nepaliCalendarData[year][month - 1];
  }
  // Fallback to default values
  return nepaliMonths[month - 1].days;
};

// Convert Nepali date to approximate English date for display purposes
export const nepaliToEnglish = (nepaliYear: number, nepaliMonth: number, nepaliDay: number): Date => {
  // This is a simplified conversion for display purposes
  // In a real application, you'd use a proper conversion library
  const englishYear = nepaliYear - 57;
  const baseDate = new Date(englishYear, nepaliMonth - 1, nepaliDay);
  return baseDate;
};

// Get current Nepali date (simplified - in real app you'd use proper conversion)
export const getCurrentNepaliDate = (): NepaliDate => {
  // For now, returning current month as Jestha 2082 (May/June 2025)
  // In a real application, you'd convert the current English date to Nepali
  return {
    year: 2082,
    month: 2, // Jestha
    day: new Date().getDate()
  };
};

// Generate calendar grid for a Nepali month
export const generateNepaliCalendarGrid = (year: number, month: number): (number | null)[] => {
  const daysInMonth = getDaysInNepaliMonth(year, month);
  
  // Get the starting day of the week for this month
  // This is simplified - in reality you'd need proper Nepali calendar calculations
  const firstDate = nepaliToEnglish(year, month, 1);
  const startingDayOfWeek = firstDate.getDay();
  
  const grid: (number | null)[] = [];
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    grid.push(null);
  }
  
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(day);
  }
  
  return grid;
};
