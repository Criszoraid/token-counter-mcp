from mcp.server.fastmcp import FastMCP
import inspect

mcp = FastMCP("test")
print("Attributes:", dir(mcp))
print("Run signature:", inspect.signature(mcp.run))
