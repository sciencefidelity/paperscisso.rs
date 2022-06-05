import TimeInput from "../../components/TimeInput"
import TwitterUrl from "../../components/TwitterUrl"
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
          {title: 'Sunday', value: '0'},
          {title: 'Monday', value: '1'},
          {title: 'Tuesday', value: '2'},
          {title: 'Wednesday', value: '3'},
          {title: 'Thursday', value: '4'},
          {title: 'Friday', value: '5'},
          {title: 'Saturday', value: '6'}
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
      name: 'twitter',
      title: 'Twitter Url',
      type: 'string',
      imputComponent: TwitterUrl
    },
    {
      name: 'time',
      title: 'Time',
      type: 'number',
      imputComponent: TimeInput
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
