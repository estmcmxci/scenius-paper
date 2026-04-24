from .paper import search_paper, get_section, get_references

all_tools = [
    search_paper,
    get_section,
    get_references,
]

try:
    from .simulation import query_results, compare_mechanisms, get_parameters, run_custom_simulation, generate_figure
    all_tools.extend([query_results, compare_mechanisms, get_parameters, run_custom_simulation, generate_figure])
except Exception:
    pass  # Simulation data not available in this deployment
