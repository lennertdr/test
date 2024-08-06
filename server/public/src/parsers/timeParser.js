export function xsdDurationToText(xsdDuration) {
    // Reguliere expressie om de XSD-duur te parseren
    const durationRegex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
    const matches = xsdDuration.match(durationRegex);

    if (!matches) {
        // If the duration isn't in the right format, use whatever is behind the context
        return xsdDuration;
    }

    const years = matches[1] ? `${matches[1]} year${matches[1] > 1 ? 's' : ''}` : '';
    const months = matches[2] ? `${matches[2]} month${matches[2] > 1 ? 's' : ''}` : '';
    const days = matches[3] ? `${matches[3]} day${matches[3] > 1 ? 's' : ''}` : '';
    const hours = matches[4] ? `${matches[4]} hour${matches[4] > 1 ? 's' : ''}` : '';
    const minutes = matches[5] ? `${matches[5]} minute${matches[5] > 1 ? 's' : ''}` : '';
    const seconds = matches[6] ? `${matches[6]} second${matches[6] > 1 ? 's' : ''}` : '';

    // Combineer de tekstuele representaties
    const parts = [years, months, days, hours, minutes, seconds].filter(part => part !== '');
    return parts.join(', ');
}

export const calculateEndDate = (coverage) => {
    const durationRegex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
    const [start, end] = coverage.split('/');
    const matches = end.match(durationRegex);

    // Objectify how long the duration lasts
    const duration =  {
        years: parseInt(matches[1] || 0, 10),
        months: parseInt(matches[2] || 0, 10),
        days: parseInt(matches[3] || 0, 10),
        hours: parseInt(matches[4] || 0, 10),
        minutes: parseInt(matches[5] || 0, 10),
        seconds: parseInt(matches[6] || 0, 10),
    };

    // Add the duration to the start date
    const date = new Date(start);
    date.setFullYear(date.getFullYear() + duration.years);
    date.setMonth(date.getMonth() + duration.months);
    date.setDate(date.getDate() + duration.days);
    date.setHours(date.getHours() + duration.hours);
    date.setMinutes(date.getMinutes() + duration.minutes);
    date.setSeconds(date.getSeconds() + duration.seconds);
    return date;

}
