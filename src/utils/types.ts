/**
 * @summary An object representing a user appointment.
 */
export type AppointmentDto = {
    id: string;
    paymentId: string;
    userId: string;
    duration: number;
    scheduledTime: string;
    status: "SCHEDULED" | "PAID" | "COMPLETE" | "IN_PROGRESS";
    workOrder: {
      service: string;
    };
};

/**
 * @summary Base64 string
 */
export type Cursor = string

export type Edge<Node> = {
    node: Node
    cursor: Cursor
}

/**
 * @summary Contains properties relating to pagination.
 */
export type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    previousCursor: Cursor;
    nextCursor: Cursor
}

export type Connection<Node> = {
    edges: Edge<Node>[]
    pageInfo: PageInfo
}

export type AppointmentConnection = Connection<AppointmentDto>

/**
 * @summary Request body to be sent to /api/auth
 */
export type LoginRequestBody = {
    username: string
    password: string
}

/**
 * @summary Response from /api/auth
 */
export type LoginResponse = {
    token: string
}
