import { z } from "zod";
/** One chat turn from the UI (no system role — server adds instructions). */
export declare const AssistantChatMessageSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant"]>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role: "user" | "assistant";
    content: string;
}, {
    role: "user" | "assistant";
    content: string;
}>;
export type AssistantChatMessage = z.infer<typeof AssistantChatMessageSchema>;
export declare const DashboardListingSummarySchema: z.ZodObject<{
    listingId: z.ZodString;
    floorPriceUsdc: z.ZodString;
    adType: z.ZodString;
    format: z.ZodString;
    sellerAgentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adType: string;
    format: string;
    listingId: string;
    sellerAgentId: string;
    floorPriceUsdc: string;
}, {
    adType: string;
    format: string;
    listingId: string;
    sellerAgentId: string;
    floorPriceUsdc: string;
}>;
export type DashboardListingSummary = z.infer<typeof DashboardListingSummarySchema>;
export declare const DashboardBidSummarySchema: z.ZodObject<{
    bidId: z.ZodString;
    bidAmountUsdc: z.ZodString;
    buyerAgentId: z.ZodString;
    /** BidRequest has no listing id; format/size hint targeting. */
    format: z.ZodString;
    size: z.ZodString;
}, "strip", z.ZodTypeAny, {
    format: string;
    size: string;
    bidId: string;
    buyerAgentId: string;
    bidAmountUsdc: string;
}, {
    format: string;
    size: string;
    bidId: string;
    buyerAgentId: string;
    bidAmountUsdc: string;
}>;
export type DashboardBidSummary = z.infer<typeof DashboardBidSummarySchema>;
/** Sanitized snapshot of exchange UI state for Atlas (no secrets). */
export declare const DashboardAssistantContextSchema: z.ZodObject<{
    generatedAt: z.ZodString;
    sseConnected: z.ZodBoolean;
    demoPaused: z.ZodBoolean;
    settlementCount: z.ZodNumber;
    listings: z.ZodArray<z.ZodObject<{
        listingId: z.ZodString;
        floorPriceUsdc: z.ZodString;
        adType: z.ZodString;
        format: z.ZodString;
        sellerAgentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        adType: string;
        format: string;
        listingId: string;
        sellerAgentId: string;
        floorPriceUsdc: string;
    }, {
        adType: string;
        format: string;
        listingId: string;
        sellerAgentId: string;
        floorPriceUsdc: string;
    }>, "many">;
    bids: z.ZodArray<z.ZodObject<{
        bidId: z.ZodString;
        bidAmountUsdc: z.ZodString;
        buyerAgentId: z.ZodString;
        /** BidRequest has no listing id; format/size hint targeting. */
        format: z.ZodString;
        size: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        format: string;
        size: string;
        bidId: string;
        buyerAgentId: string;
        bidAmountUsdc: string;
    }, {
        format: string;
        size: string;
        bidId: string;
        buyerAgentId: string;
        bidAmountUsdc: string;
    }>, "many">;
    recentAuctions: z.ZodArray<z.ZodObject<{
        auctionId: z.ZodString;
        listingId: z.ZodString;
        winningBidId: z.ZodString;
        winnerBuyerAgentId: z.ZodString;
        winnerBuyerWallet: z.ZodString;
        sellerAgentId: z.ZodString;
        sellerWallet: z.ZodString;
        winningBidUsdc: z.ZodString;
        clearingPriceUsdc: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }>, "many">;
    lastAuction: z.ZodNullable<z.ZodObject<{
        auctionId: z.ZodString;
        listingId: z.ZodString;
        winningBidId: z.ZodString;
        winnerBuyerAgentId: z.ZodString;
        winnerBuyerWallet: z.ZodString;
        sellerAgentId: z.ZodString;
        sellerWallet: z.ZodString;
        winningBidUsdc: z.ZodString;
        clearingPriceUsdc: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }>>;
    lastReceipt: z.ZodNullable<z.ZodObject<{
        receiptId: z.ZodString;
        auctionId: z.ZodString;
        buyerWallet: z.ZodString;
        sellerWallet: z.ZodString;
        gatewayContract: z.ZodString;
        amountUsdc: z.ZodString;
        eip3009Nonce: z.ZodString;
        status: z.ZodEnum<["pending", "confirmed", "failed"]>;
        arcTxHash: z.ZodOptional<z.ZodString>;
        arcLogIndex: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodString;
        confirmedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "confirmed" | "failed";
        sellerWallet: string;
        createdAt: string;
        buyerWallet: string;
        auctionId: string;
        receiptId: string;
        gatewayContract: string;
        amountUsdc: string;
        eip3009Nonce: string;
        arcTxHash?: string | undefined;
        arcLogIndex?: number | undefined;
        confirmedAt?: string | undefined;
    }, {
        status: "pending" | "confirmed" | "failed";
        sellerWallet: string;
        createdAt: string;
        buyerWallet: string;
        auctionId: string;
        receiptId: string;
        gatewayContract: string;
        amountUsdc: string;
        eip3009Nonce: string;
        arcTxHash?: string | undefined;
        arcLogIndex?: number | undefined;
        confirmedAt?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    generatedAt: string;
    sseConnected: boolean;
    demoPaused: boolean;
    settlementCount: number;
    listings: {
        adType: string;
        format: string;
        listingId: string;
        sellerAgentId: string;
        floorPriceUsdc: string;
    }[];
    bids: {
        format: string;
        size: string;
        bidId: string;
        buyerAgentId: string;
        bidAmountUsdc: string;
    }[];
    recentAuctions: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }[];
    lastAuction: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    } | null;
    lastReceipt: {
        status: "pending" | "confirmed" | "failed";
        sellerWallet: string;
        createdAt: string;
        buyerWallet: string;
        auctionId: string;
        receiptId: string;
        gatewayContract: string;
        amountUsdc: string;
        eip3009Nonce: string;
        arcTxHash?: string | undefined;
        arcLogIndex?: number | undefined;
        confirmedAt?: string | undefined;
    } | null;
}, {
    generatedAt: string;
    sseConnected: boolean;
    demoPaused: boolean;
    settlementCount: number;
    listings: {
        adType: string;
        format: string;
        listingId: string;
        sellerAgentId: string;
        floorPriceUsdc: string;
    }[];
    bids: {
        format: string;
        size: string;
        bidId: string;
        buyerAgentId: string;
        bidAmountUsdc: string;
    }[];
    recentAuctions: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }[];
    lastAuction: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    } | null;
    lastReceipt: {
        status: "pending" | "confirmed" | "failed";
        sellerWallet: string;
        createdAt: string;
        buyerWallet: string;
        auctionId: string;
        receiptId: string;
        gatewayContract: string;
        amountUsdc: string;
        eip3009Nonce: string;
        arcTxHash?: string | undefined;
        arcLogIndex?: number | undefined;
        confirmedAt?: string | undefined;
    } | null;
}>;
export type DashboardAssistantContext = z.infer<typeof DashboardAssistantContextSchema>;
/** Role discriminator: lets the server pick the buyer vs seller system prompt. */
export declare const AssistantChatRoleSchema: z.ZodEnum<["buyer", "seller"]>;
export type AssistantChatRole = z.infer<typeof AssistantChatRoleSchema>;
export declare const AssistantChatRequestSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant"]>;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "assistant";
        content: string;
    }, {
        role: "user" | "assistant";
        content: string;
    }>, "many">;
    context: z.ZodObject<{
        generatedAt: z.ZodString;
        sseConnected: z.ZodBoolean;
        demoPaused: z.ZodBoolean;
        settlementCount: z.ZodNumber;
        listings: z.ZodArray<z.ZodObject<{
            listingId: z.ZodString;
            floorPriceUsdc: z.ZodString;
            adType: z.ZodString;
            format: z.ZodString;
            sellerAgentId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }, {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }>, "many">;
        bids: z.ZodArray<z.ZodObject<{
            bidId: z.ZodString;
            bidAmountUsdc: z.ZodString;
            buyerAgentId: z.ZodString;
            /** BidRequest has no listing id; format/size hint targeting. */
            format: z.ZodString;
            size: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }, {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }>, "many">;
        recentAuctions: z.ZodArray<z.ZodObject<{
            auctionId: z.ZodString;
            listingId: z.ZodString;
            winningBidId: z.ZodString;
            winnerBuyerAgentId: z.ZodString;
            winnerBuyerWallet: z.ZodString;
            sellerAgentId: z.ZodString;
            sellerWallet: z.ZodString;
            winningBidUsdc: z.ZodString;
            clearingPriceUsdc: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }, {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }>, "many">;
        lastAuction: z.ZodNullable<z.ZodObject<{
            auctionId: z.ZodString;
            listingId: z.ZodString;
            winningBidId: z.ZodString;
            winnerBuyerAgentId: z.ZodString;
            winnerBuyerWallet: z.ZodString;
            sellerAgentId: z.ZodString;
            sellerWallet: z.ZodString;
            winningBidUsdc: z.ZodString;
            clearingPriceUsdc: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }, {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }>>;
        lastReceipt: z.ZodNullable<z.ZodObject<{
            receiptId: z.ZodString;
            auctionId: z.ZodString;
            buyerWallet: z.ZodString;
            sellerWallet: z.ZodString;
            gatewayContract: z.ZodString;
            amountUsdc: z.ZodString;
            eip3009Nonce: z.ZodString;
            status: z.ZodEnum<["pending", "confirmed", "failed"]>;
            arcTxHash: z.ZodOptional<z.ZodString>;
            arcLogIndex: z.ZodOptional<z.ZodNumber>;
            createdAt: z.ZodString;
            confirmedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        }, {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        generatedAt: string;
        sseConnected: boolean;
        demoPaused: boolean;
        settlementCount: number;
        listings: {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }[];
        bids: {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }[];
        recentAuctions: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }[];
        lastAuction: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        } | null;
        lastReceipt: {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        } | null;
    }, {
        generatedAt: string;
        sseConnected: boolean;
        demoPaused: boolean;
        settlementCount: number;
        listings: {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }[];
        bids: {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }[];
        recentAuctions: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }[];
        lastAuction: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        } | null;
        lastReceipt: {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        } | null;
    }>;
    /** Defaults to "buyer" so existing buyer clients keep working without sending the field. */
    role: z.ZodDefault<z.ZodEnum<["buyer", "seller"]>>;
    /** Composer mode hint (e.g. "ask", "set_floor"). Server-side prompt may use this for shaping. */
    mode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "buyer" | "seller";
    messages: {
        role: "user" | "assistant";
        content: string;
    }[];
    context: {
        generatedAt: string;
        sseConnected: boolean;
        demoPaused: boolean;
        settlementCount: number;
        listings: {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }[];
        bids: {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }[];
        recentAuctions: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }[];
        lastAuction: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        } | null;
        lastReceipt: {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        } | null;
    };
    mode?: string | undefined;
}, {
    messages: {
        role: "user" | "assistant";
        content: string;
    }[];
    context: {
        generatedAt: string;
        sseConnected: boolean;
        demoPaused: boolean;
        settlementCount: number;
        listings: {
            adType: string;
            format: string;
            listingId: string;
            sellerAgentId: string;
            floorPriceUsdc: string;
        }[];
        bids: {
            format: string;
            size: string;
            bidId: string;
            buyerAgentId: string;
            bidAmountUsdc: string;
        }[];
        recentAuctions: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        }[];
        lastAuction: {
            listingId: string;
            sellerAgentId: string;
            sellerWallet: string;
            createdAt: string;
            auctionId: string;
            winningBidId: string;
            winnerBuyerAgentId: string;
            winnerBuyerWallet: string;
            winningBidUsdc: string;
            clearingPriceUsdc: string;
        } | null;
        lastReceipt: {
            status: "pending" | "confirmed" | "failed";
            sellerWallet: string;
            createdAt: string;
            buyerWallet: string;
            auctionId: string;
            receiptId: string;
            gatewayContract: string;
            amountUsdc: string;
            eip3009Nonce: string;
            arcTxHash?: string | undefined;
            arcLogIndex?: number | undefined;
            confirmedAt?: string | undefined;
        } | null;
    };
    role?: "buyer" | "seller" | undefined;
    mode?: string | undefined;
}>;
export type AssistantChatRequest = z.infer<typeof AssistantChatRequestSchema>;
/** Metric row in a dashboard-style strip (exchange snapshot vs demo simulation). */
export declare const AssistantMetricItemSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    dataSource: z.ZodEnum<["exchange", "simulated"]>;
}, "strip", z.ZodTypeAny, {
    value: string;
    label: string;
    dataSource: "exchange" | "simulated";
}, {
    value: string;
    label: string;
    dataSource: "exchange" | "simulated";
}>;
export type AssistantMetricItem = z.infer<typeof AssistantMetricItemSchema>;
export declare const AssistantMetricsStripBlockSchema: z.ZodObject<{
    type: z.ZodLiteral<"metrics_strip">;
    items: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        dataSource: z.ZodEnum<["exchange", "simulated"]>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }, {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "metrics_strip";
    items: {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }[];
}, {
    type: "metrics_strip";
    items: {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }[];
}>;
export type AssistantMetricsStripBlock = z.infer<typeof AssistantMetricsStripBlockSchema>;
export declare const AssistantPillSchema: z.ZodObject<{
    text: z.ZodString;
    variant: z.ZodEnum<["new", "kept", "neutral"]>;
}, "strip", z.ZodTypeAny, {
    text: string;
    variant: "new" | "kept" | "neutral";
}, {
    text: string;
    variant: "new" | "kept" | "neutral";
}>;
export type AssistantPill = z.infer<typeof AssistantPillSchema>;
export declare const AssistantPillGroupBlockSchema: z.ZodObject<{
    type: z.ZodLiteral<"pill_group">;
    sectionTitle: z.ZodString;
    pills: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        variant: z.ZodEnum<["new", "kept", "neutral"]>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        variant: "new" | "kept" | "neutral";
    }, {
        text: string;
        variant: "new" | "kept" | "neutral";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "pill_group";
    sectionTitle: string;
    pills: {
        text: string;
        variant: "new" | "kept" | "neutral";
    }[];
}, {
    type: "pill_group";
    sectionTitle: string;
    pills: {
        text: string;
        variant: "new" | "kept" | "neutral";
    }[];
}>;
export type AssistantPillGroupBlock = z.infer<typeof AssistantPillGroupBlockSchema>;
export declare const AssistantRejectedAlternativeSchema: z.ZodObject<{
    action: z.ZodString;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    action: string;
    reason: string;
}, {
    action: string;
    reason: string;
}>;
export type AssistantRejectedAlternative = z.infer<typeof AssistantRejectedAlternativeSchema>;
export declare const AssistantDecisionBlockSchema: z.ZodObject<{
    type: z.ZodLiteral<"decision">;
    headline: z.ZodString;
    summary: z.ZodString;
    reasoning: z.ZodArray<z.ZodString, "many">;
    rejected: z.ZodArray<z.ZodObject<{
        action: z.ZodString;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
        reason: string;
    }, {
        action: string;
        reason: string;
    }>, "many">;
    complianceNote: z.ZodOptional<z.ZodString>;
    badge: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "decision";
    headline: string;
    summary: string;
    reasoning: string[];
    rejected: {
        action: string;
        reason: string;
    }[];
    complianceNote?: string | undefined;
    badge?: string | undefined;
}, {
    type: "decision";
    headline: string;
    summary: string;
    reasoning: string[];
    rejected: {
        action: string;
        reason: string;
    }[];
    complianceNote?: string | undefined;
    badge?: string | undefined;
}>;
export type AssistantDecisionBlock = z.infer<typeof AssistantDecisionBlockSchema>;
/** One bar in a simple categorical bar chart (values are unitless counts or relative amounts for the demo). */
export declare const AssistantChartPointSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    label: string;
}, {
    value: number;
    label: string;
}>;
export type AssistantChartPoint = z.infer<typeof AssistantChartPointSchema>;
export declare const AssistantBarChartBlockSchema: z.ZodObject<{
    type: z.ZodLiteral<"bar_chart">;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    /** Short axis hint shown near values (e.g. "USDC", "count"). */
    yCaption: z.ZodOptional<z.ZodString>;
    points: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        label: string;
    }, {
        value: number;
        label: string;
    }>, "many">;
    dataSource: z.ZodDefault<z.ZodEnum<["exchange", "simulated"]>>;
}, "strip", z.ZodTypeAny, {
    type: "bar_chart";
    dataSource: "exchange" | "simulated";
    title: string;
    points: {
        value: number;
        label: string;
    }[];
    subtitle?: string | undefined;
    yCaption?: string | undefined;
}, {
    type: "bar_chart";
    title: string;
    points: {
        value: number;
        label: string;
    }[];
    dataSource?: "exchange" | "simulated" | undefined;
    subtitle?: string | undefined;
    yCaption?: string | undefined;
}>;
export type AssistantBarChartBlock = z.infer<typeof AssistantBarChartBlockSchema>;
export declare const AssistantUiBlockSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"metrics_strip">;
    items: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        dataSource: z.ZodEnum<["exchange", "simulated"]>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }, {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "metrics_strip";
    items: {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }[];
}, {
    type: "metrics_strip";
    items: {
        value: string;
        label: string;
        dataSource: "exchange" | "simulated";
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"pill_group">;
    sectionTitle: z.ZodString;
    pills: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        variant: z.ZodEnum<["new", "kept", "neutral"]>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        variant: "new" | "kept" | "neutral";
    }, {
        text: string;
        variant: "new" | "kept" | "neutral";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "pill_group";
    sectionTitle: string;
    pills: {
        text: string;
        variant: "new" | "kept" | "neutral";
    }[];
}, {
    type: "pill_group";
    sectionTitle: string;
    pills: {
        text: string;
        variant: "new" | "kept" | "neutral";
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"decision">;
    headline: z.ZodString;
    summary: z.ZodString;
    reasoning: z.ZodArray<z.ZodString, "many">;
    rejected: z.ZodArray<z.ZodObject<{
        action: z.ZodString;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
        reason: string;
    }, {
        action: string;
        reason: string;
    }>, "many">;
    complianceNote: z.ZodOptional<z.ZodString>;
    badge: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "decision";
    headline: string;
    summary: string;
    reasoning: string[];
    rejected: {
        action: string;
        reason: string;
    }[];
    complianceNote?: string | undefined;
    badge?: string | undefined;
}, {
    type: "decision";
    headline: string;
    summary: string;
    reasoning: string[];
    rejected: {
        action: string;
        reason: string;
    }[];
    complianceNote?: string | undefined;
    badge?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bar_chart">;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    /** Short axis hint shown near values (e.g. "USDC", "count"). */
    yCaption: z.ZodOptional<z.ZodString>;
    points: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        label: string;
    }, {
        value: number;
        label: string;
    }>, "many">;
    dataSource: z.ZodDefault<z.ZodEnum<["exchange", "simulated"]>>;
}, "strip", z.ZodTypeAny, {
    type: "bar_chart";
    dataSource: "exchange" | "simulated";
    title: string;
    points: {
        value: number;
        label: string;
    }[];
    subtitle?: string | undefined;
    yCaption?: string | undefined;
}, {
    type: "bar_chart";
    title: string;
    points: {
        value: number;
        label: string;
    }[];
    dataSource?: "exchange" | "simulated" | undefined;
    subtitle?: string | undefined;
    yCaption?: string | undefined;
}>]>;
export type AssistantUiBlock = z.infer<typeof AssistantUiBlockSchema>;
export declare const AssistantChatResponseSchema: z.ZodObject<{
    reply: z.ZodString;
    blocks: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"metrics_strip">;
        items: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
            dataSource: z.ZodEnum<["exchange", "simulated"]>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }, {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "metrics_strip";
        items: {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }[];
    }, {
        type: "metrics_strip";
        items: {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"pill_group">;
        sectionTitle: z.ZodString;
        pills: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            variant: z.ZodEnum<["new", "kept", "neutral"]>;
        }, "strip", z.ZodTypeAny, {
            text: string;
            variant: "new" | "kept" | "neutral";
        }, {
            text: string;
            variant: "new" | "kept" | "neutral";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "pill_group";
        sectionTitle: string;
        pills: {
            text: string;
            variant: "new" | "kept" | "neutral";
        }[];
    }, {
        type: "pill_group";
        sectionTitle: string;
        pills: {
            text: string;
            variant: "new" | "kept" | "neutral";
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"decision">;
        headline: z.ZodString;
        summary: z.ZodString;
        reasoning: z.ZodArray<z.ZodString, "many">;
        rejected: z.ZodArray<z.ZodObject<{
            action: z.ZodString;
            reason: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            action: string;
            reason: string;
        }, {
            action: string;
            reason: string;
        }>, "many">;
        complianceNote: z.ZodOptional<z.ZodString>;
        badge: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "decision";
        headline: string;
        summary: string;
        reasoning: string[];
        rejected: {
            action: string;
            reason: string;
        }[];
        complianceNote?: string | undefined;
        badge?: string | undefined;
    }, {
        type: "decision";
        headline: string;
        summary: string;
        reasoning: string[];
        rejected: {
            action: string;
            reason: string;
        }[];
        complianceNote?: string | undefined;
        badge?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bar_chart">;
        title: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
        /** Short axis hint shown near values (e.g. "USDC", "count"). */
        yCaption: z.ZodOptional<z.ZodString>;
        points: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            label: string;
        }, {
            value: number;
            label: string;
        }>, "many">;
        dataSource: z.ZodDefault<z.ZodEnum<["exchange", "simulated"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "bar_chart";
        dataSource: "exchange" | "simulated";
        title: string;
        points: {
            value: number;
            label: string;
        }[];
        subtitle?: string | undefined;
        yCaption?: string | undefined;
    }, {
        type: "bar_chart";
        title: string;
        points: {
            value: number;
            label: string;
        }[];
        dataSource?: "exchange" | "simulated" | undefined;
        subtitle?: string | undefined;
        yCaption?: string | undefined;
    }>]>, "many">>;
}, "strip", z.ZodTypeAny, {
    reply: string;
    blocks?: ({
        type: "metrics_strip";
        items: {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }[];
    } | {
        type: "pill_group";
        sectionTitle: string;
        pills: {
            text: string;
            variant: "new" | "kept" | "neutral";
        }[];
    } | {
        type: "decision";
        headline: string;
        summary: string;
        reasoning: string[];
        rejected: {
            action: string;
            reason: string;
        }[];
        complianceNote?: string | undefined;
        badge?: string | undefined;
    } | {
        type: "bar_chart";
        dataSource: "exchange" | "simulated";
        title: string;
        points: {
            value: number;
            label: string;
        }[];
        subtitle?: string | undefined;
        yCaption?: string | undefined;
    })[] | undefined;
}, {
    reply: string;
    blocks?: ({
        type: "metrics_strip";
        items: {
            value: string;
            label: string;
            dataSource: "exchange" | "simulated";
        }[];
    } | {
        type: "pill_group";
        sectionTitle: string;
        pills: {
            text: string;
            variant: "new" | "kept" | "neutral";
        }[];
    } | {
        type: "decision";
        headline: string;
        summary: string;
        reasoning: string[];
        rejected: {
            action: string;
            reason: string;
        }[];
        complianceNote?: string | undefined;
        badge?: string | undefined;
    } | {
        type: "bar_chart";
        title: string;
        points: {
            value: number;
            label: string;
        }[];
        dataSource?: "exchange" | "simulated" | undefined;
        subtitle?: string | undefined;
        yCaption?: string | undefined;
    })[] | undefined;
}>;
export type AssistantChatResponse = z.infer<typeof AssistantChatResponseSchema>;
/**
 * Parse model JSON tolerantly: keep `reply`, accept up to 5 valid blocks and drop invalid entries.
 */
export declare function parseAssistantChatResponse(input: unknown): AssistantChatResponse;
//# sourceMappingURL=assistant.d.ts.map