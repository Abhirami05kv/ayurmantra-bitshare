import React from "react";

function AyurvedaTable() {
    return (
        <div className="overflow-x-auto p-6 w-3/4 mx-auto">
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                
                <tbody className="bg-white text-gray-700 text-md">
                    {[
                        ["HERBAL FACIAL", "60 MIN", "£66"],
                        ["NEEM FACIAL", "60 MIN", "£66"],
                        ["BANANA FACIAL", "60 MIN", "£66"],
                        ["PAPAYA FACIAL", "60 MIN", "£66"],
                        ["SAFFRON FACIAL", "60 MIN", "£66"],
                        ["GOLD FACIAL", "60 MIN", "£66"],
                        ["PLATINUM FACIAL", "60 MIN", "£66"]
                    ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border px-6 py-4">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AyurvedaTable;
