import { Date } from '../../components/twemoji'

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Date,
  fields: [
    {
      name: 'title',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'day',
      title: 'Day of the week',
      type: 'string',
      options: {
        list: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ]
      }
    },
    {
      name: 'frequency',
      title: 'Frequency',
      type: 'string',
      options: {
        list: [
          {title: 'Weekly', value: '1'},
          {title: 'Fortnighly, first and third week', value: '2'},
          {title: 'Fortnighly, second and forth week', value: '3'},
          {title: 'Monthly, first week', value: '4'},
          {title: 'Monthly, second week', value: '5'},
          {title: 'Monthly, third week', value: '6'},
          {title: 'Monthly, fourth week', value: '7'}
        ]
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'frequency',
      media: 'image'
    }
  }
}
