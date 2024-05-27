// Import "Event" from 'cc' module
import { Event } from 'cc';

/**
 * Represents a custom event.
 */
export class MyEvent extends Event {
    /**
     * Creates a new instance of the MyEvent class.
     * @param name - The name of the event.
     * @param bubbles - Indicates whether the event bubbles up through the DOM or not. Optional, default is false.
     * @param detail - Additional data associated with the event. Optional.
     */
    constructor(name: string, bubbles?: boolean, detail?: any){
        super(name, bubbles);
        this.detail = detail;
    }

    /**
     * Additional data associated with the event.
     */
    public detail: any = null;  // Custom property
}

export const eventTarget = new EventTarget();